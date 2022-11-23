import { IonCol, IonGrid, IonList, IonRow, IonTitle } from "@ionic/react";
import React, { Dispatch } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import { AuthProps } from "../../interface/props/auth";
import Tour from "../../interface/tour";
import { formatPerson, formatCity, formatDate } from "../../utils/fmt";

const listColumns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    wrap: true
  },
  {
    name: "Отель",
    selector: "hotel.name",
    sortable: true,
    wrap: true
  },
  {
    name: "Дата заезда",
    selector: "arrival_date",
    sortable: true,
    wrap: true,
    cell: (e: Tour) => formatDate(e.arrival_date)
  },
  {
    name: "Дата выезда",
    selector: "departure_date",
    sortable: true,
    wrap: true,
    cell: (e: Tour) => formatDate(e.departure_date)
  },
  {
    name: "Кол-во дней/ночей",
    selector: "departure_date",
    sortable: true,
    wrap: true,
    cell: (e: Tour) => {
      const diffInMs = Date.parse(e.departure_date as unknown as string) - Date.parse(e.arrival_date as unknown as string)
      return `${diffInMs / (1000 * 60 * 60 * 24)}/${diffInMs / (1000 * 60 * 60 * 24)}`;
    }
  },
  {
    name: "Вид питания",
    selector: "feeding_type.name",
    sortable: true,
    wrap: true,
  },
  {
    name: "Стоимость",
    selector: "cost",
    sortable: true,
    wrap: true,
  },
];

const ExpandedTour = ({ data }: { data: any}) => {
  return (
    <IonGrid>
      <IonGrid>
        <IonRow>
          <IonCol>{'ID:'}</IonCol>
          <IonCol size='10'>{data.id}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Отель:'}</IonCol>
          <IonCol size='10'>{data.hotel.name}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Дата заезда:'}</IonCol>
          <IonCol size='10'>{formatDate(data.arrival_date)}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Дата выезда:'}</IonCol>
          <IonCol size='10'>{formatDate(data.departure_date)}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Кол-во дней/ночей:'}</IonCol>
          <IonCol size='10'>
            {
              (() => {
                const diffInMs = Date.parse(data.departure_date as string) - Date.parse(data.arrival_date as string)
                return `${diffInMs / (1000 * 60 * 60 * 24)}/${diffInMs / (1000 * 60 * 60 * 24)}`;
              })()
            }
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Вид питания:'}</IonCol>
          <IonCol size='10'>{data.feeding_type.name}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Стоимость:'}</IonCol>
          <IonCol size='10'>{data.cost}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{'Описание:'}</IonCol>
          <IonCol size='10'>{data.description}</IonCol>
        </IonRow>
      </IonGrid>
    </IonGrid>
  );
}

export interface ToursListProps {
  tours: Array<Tour> | null,
  on_selected_change: Dispatch<React.SetStateAction<Array<Tour>>>
}

export const ToursList: React.FC<ToursListProps & AuthProps> = (props) => {
  return (
    <IonList id="tours-list">
      {
        (props.tours === null) ?
          <IonTitle>Загрузка...</IonTitle> :
          <DataTableExtensions
            columns={listColumns}
            data={props.tours}
            print={false}
            export={false}
            filterPlaceholder="Поиск"
          >
            <DataTable
            title="Список туров:"
            columns={listColumns as any}
            data={props.tours}
            defaultSortFieldId="name"
            onSelectedRowsChange={({selectedRows}) => props.on_selected_change(selectedRows)}
            pagination
            selectableRows
            expandableRows={true}
            expandableRowsComponent={ExpandedTour}
            highlightOnHover
          />
         </DataTableExtensions>
  
      }
    </IonList>
  );
}
