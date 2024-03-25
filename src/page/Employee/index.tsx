import IconButton from "@components/commons/IconButton";
import Modal from "@components/modal/Modal";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { useEffect, useState } from "react";
import { fetchEmployeesAction } from "redux/slices/employee/actions";
import { setCurrentPage } from "redux/slices/navigation/actions";
import iconAdd from "@static/icon/add.svg";
import { addMessage } from "redux/slices/errors/actions";
import { nanoid } from "@reduxjs/toolkit";
import { NoticeTypes, Roles } from "constans/enums";
import { getIsAdmin, isAuthorized } from "redux/slices/user/selectors";
import CreateEmployeeForm from "@components/forms/CreateEmployeeForm";
import { getEmployee, getFetchStatus } from "redux/slices/employee/selectors";
import Loading from "@components/commons/Loading";
import { FetchStatus } from "redux/types";

export default function Employee() {
  const dispatch = useAppDispatch();
  const [isVisbleModal, setIsVisibleModal] = useState(false);

  const authorized = useAppSelector(isAuthorized);

  const fetchStatus = useAppSelector(getFetchStatus);

  const isAdmin = useAppSelector(getIsAdmin);

  useEffect(() => {
    dispatch(setCurrentPage("employee"));
  }, [dispatch]);

  useEffect(() => {
    if (authorized) dispatch(fetchEmployeesAction());
  }, [authorized, dispatch]);

  const handleAddEmployee = () => {
    if (!isAdmin)
      return dispatch(
        addMessage({
          id: nanoid(),
          message: "У вас ограниченные права доступа",
          type: NoticeTypes.error,
        })
      );
    setIsVisibleModal(true);
  };

  const employee = useAppSelector(getEmployee);

  return (
    <>
      {isVisbleModal && (
        <Modal onClose={() => setIsVisibleModal(false)}>
          <CreateEmployeeForm onClose={() => setIsVisibleModal(false)} />
        </Modal>
      )}
      <IconButton transparent onClick={handleAddEmployee}>
        <img src={iconAdd} alt="" />
        Добавить сотрудника
      </IconButton>

      <div className="table-report">
        <div className="table-report__row header">
          <div className="table-report__item author">ФИО</div>
          <div className="table-report__item">Права</div>
          <div className="table-report__item">Почта</div>
        </div>
        {fetchStatus === FetchStatus.Fetching ? (
          <Loading text="Загружаем список сотрудников" />
        ) : (
          employee.map((e) => {
            return (
              <div className="table-report__row" key={e.id}>
                <div className="table-report__item author">{`${e.sername} ${e.name} ${e.patronymic}`}</div>
                <div className="table-report__item">
                  {e.role && Roles[e.role]}
                </div>
                <div className="table-report__item">{e.email}</div>
              </div>
            );
          })
        )}
        {}
      </div>
    </>
  );
}
