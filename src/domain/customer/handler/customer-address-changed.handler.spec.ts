import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import SendConsoleLogWhenAddressCustomerIsChangeddHandler from "./send-console-log-when-address-customer-is-changeed.handler";


describe("Customer Address changed event tests", () => {
    
    it("should register event handler customer-address-changed", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressCustomerIsChangeddHandler();
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister event handler customer-address-changed", () => {
            
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressCustomerIsChangeddHandler();
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
        

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);        

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
    });

    
    it("should call handler to customer-address changed", () => {
                    
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressCustomerIsChangeddHandler();           
        const spyEventHandler = jest.spyOn(eventHandler, "handle");        
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);                
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);        
        
        const address = new Address("Rua Aurora", 123, "Sao Paulo", "12345678");
        const customerCreatedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Pedro Jose",
            address: {
                street: address.street,
                number: address.number,
                city: address.city,
                zip: address.zip
            }
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();        
    });
    

});