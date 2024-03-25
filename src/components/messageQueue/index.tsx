import { ErrorMessage } from "@components/ErrorMessage";
import { useAppSelector } from "@hooks/redux.hook";
import { getErrorMessages } from "redux/slices/errors/selectors";


export default function MessageQueue() {
  const errorMessages = useAppSelector(getErrorMessages);
  return (
    <>
      {errorMessages.length > 0 &&
        errorMessages.map((e) => {
          return (
            <ErrorMessage
              key={e.id}
              id={e.id}
              message={e.message}
              type={e.type}
            />
          );
        })}
    </>
  );
}
