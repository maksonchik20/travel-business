import Client from "./client"
import Tour from "./tour";
import TourOrderPaymentType from "./tour_order_payment_type";

export class TourOrder {
  id: number; 
  client_id: number;
  payment_type_id: number;
  tour_id: number;
  price: number;
  people_count: number;
  group_id: number;
  cost?: number;
  client?: Client;
  payment_type?: TourOrderPaymentType;
  tour?: Tour;
  status: "active" | "canceled" | "completed";

  constructor(args: {[Property in keyof TourOrder]: TourOrder[Property]}) {
    this.id = args.id;
    this.client_id = args.client_id;
    this.payment_type_id = args.payment_type_id;
    this.tour_id = args.tour_id;
    this.price = args.price;
    this.people_count = args.people_count;
    this.group_id = args.group_id;
    this.cost = args.cost;
    this.client = args.client;
    this.payment_type = args.payment_type;
    this.tour = args.tour;
    this.status = args.status;
  }
}

export default TourOrder;
