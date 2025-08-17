import useEventsLogic from './useEventsLogic';
import useBookingsLogic from './useBookingsLogic';
import useAdminState from './useAdminState';

export default function useAdminLogic() {
  const eventsLogic = useEventsLogic();
  const bookingsLogic = useBookingsLogic();
  const adminState = useAdminState();

  return {
    ...eventsLogic,
    ...bookingsLogic,
    ...adminState
  };
}
