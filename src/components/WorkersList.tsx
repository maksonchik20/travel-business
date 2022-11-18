import { IonList, IonTitle } from "@ionic/react";
import axios from "axios";
import React, { Dispatch } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { WorkerJoinedFetch } from "../interface/worker";

const listColumns: TableColumn<WorkerJoinedFetch>[] = [
  {
    name: "Имя",
    selector: (row: WorkerJoinedFetch) => row.name,
    sortable: true
  },
  {
    name: "Фамилия",
    selector: (row: WorkerJoinedFetch) => row.surname,
    sortable: true
  },
  {
    name: "Отчество",
    selector: (row: WorkerJoinedFetch) => row.last_name,
    sortable: true
  },
  {
    name: "Телефон",
    selector: (row: WorkerJoinedFetch) => row.phone_number,
    sortable: true
  },
  {
    name: "Почта",
    selector: (row: WorkerJoinedFetch) => row.email,
    sortable: true
  },
  {
    name: "Роль",
    selector: (row: WorkerJoinedFetch) => row.role_name,
    sortable: true
  }
];

export interface WorkersListProps {
  on_selected_change: Dispatch<React.SetStateAction<Array<WorkerJoinedFetch>>>
}

export const WorkersList: React.FC<WorkersListProps> = (props) => {
  const [workers, set_workers] = React.useState(null as Array<WorkerJoinedFetch> | null);

  React.useEffect(() => {
    axios
      .get("https://api.necrom.ru/worker?join=true")
      .then((response) => set_workers(response.data));
  }, [])
  
  return (
    <IonList id="workers-list">
      {
        (workers === null) ?
          <IonTitle>Загрузка...</IonTitle> :
          <DataTable
            title="Список сотрудников:"
            columns={listColumns}
            data={workers}
            defaultSortFieldId="name"
            onSelectedRowsChange={({selectedRows}) => props.on_selected_change(selectedRows)}
            pagination
            selectableRows
          />
      }
    </IonList>
  );
}