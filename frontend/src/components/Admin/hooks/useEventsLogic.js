import { useState, useEffect } from 'react';
import { addNewEvent, deleteEventByID, getEvents, getCategories } from '../../../services/Events';
import { useToast } from '../../../Context/ToastContext';

export default function useEventsLogic() {
  const [events, setEvents] = useState({});
  const [currentEvents, setCurrentEvents] = useState(1);
  const [categories, setCategories] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    categoryId: '',
    address: '',
    location: '',
    venue: '',
    price: 0,
    eventImg: null,
    description: '',
  });
  
  const { error: showError, success } = useToast();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'eventImg' && files) {
      setNewEvent({ ...newEvent, [name]: files[0] });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      date: '',
      categoryId: '',
      address: '',
      location: '',
      venue: '',
      price: 0,
      eventImg: null,
      description: '',
    });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(newEvent).forEach(([key, value]) => {
      if (key === 'eventImg' && value instanceof File) {
        formData.append('eventImg', value);
      } else if (key === 'date' && value) {
        formData.append(key, new Date(value).toISOString());
      } else if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      const addedEvent = await addNewEvent(formData);
      setEvents(prev => ({
        ...prev,
        events: [addedEvent.newEvent, ...(prev.events || [])],
        length: (prev.length || 0) + 1
      }));

      resetForm();
      success("Event added successfully!");
    } catch (error) {
      console.error("Failed to add event:", error);
      showError("Failed to add event. Please try again.");
    }
  };

  const handleEditEvent = (e) => {
    console.log("Not yet");
  };

  const handleDeleteEvent = async (e, eventId) => {
    e.preventDefault();
    let prevEvents;

    setEvents(prev => {
      prevEvents = { ...prev };
      const updatedEvents = (prev.events || []).filter(ev => ev.id !== eventId);
      return {
        ...prev,
        events: updatedEvents,
        length: (prev.length || 1) - 1
      };
    });

    try {
      await deleteEventByID(eventId);
      success("Event deleted successfully");
    } catch (error) {
      setEvents(prevEvents);
      try {
        const data = await getEvents({});
        setEvents({ events: data.events, length: data.count });
      } catch(error) {
        showError("Failed to refetch events");
      }
      showError("Failed to delete event. Please check your connection or try again later.");
    }
  };

  useEffect(() => {
    getEvents({ page: String(currentEvents) })
      .then(data => {
        setEvents({ events: data.events, length: data.count });
      });
  }, [currentEvents]);

  // Fetch categories when component mounts
  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data.categories || []);
      })
      .catch(error => {
        console.error("Failed to fetch categories:", error);
        showError("Failed to fetch categories");
      });
  }, []);

  return {
    events,
    newEvent,
    categories,
    currentEvents,
    setCurrentEvents,
    handleInputChange,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent
  };
} 