import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";


export default class SendConsoleLogWhenAddressCustomerIsChangeddHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: CustomerAddressChangedEvent): void {

        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
              Rua: ${event.eventData.address.street},
              Numero: ${event.eventData.address.number},
              Cep: ${event.eventData.address.zip},
              Cidade: ${event.eventData.address.city},
            `
          );
    }
}