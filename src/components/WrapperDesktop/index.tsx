
import { PropsWithChildren, useEffect } from "react";


type WrapperDesktopProps = PropsWithChildren;
export default function WrapperDesktop({ children }: WrapperDesktopProps) {
  // const dispatch = useAppDispatch();
  // const { setId } = useParams();

  // const set = useAppSelector((state) => getSetById(state, setId));

  // // если нет комплекта такого после загрузке всех комплекто то показываем заглушку что коплект был ахвивирован или уделен
  
  // useEffect(() => {
  //   if (set&&setId) dispatch(setSelectedSetId(setId));
  // }, [dispatch, set, setId]);

  // if (!set) return <div><img src={error} alt="" />Комплект документов был удален или заахивирован</div>;

  return <div>{children}</div>;
}
