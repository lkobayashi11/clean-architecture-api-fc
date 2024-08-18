import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "./send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "./send-console-log2-when-customer-is-created.handler";

describe("Customer created event tests", () => {
    
    it("should regiter event handler customer-created", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const eventHandlerSecondLog = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecondLog);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerSecondLog);
    });

    it("should unregister event handler customer-created", () => {
            
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const eventHandlerSecondLog = new SendConsoleLog2WhenCustomerIsCreatedHandler();    
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecondLog);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerSecondLog);


        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerSecondLog);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    
    it("should call handlers to create customer", () => {
                    
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();   
        const eventHandlerConsoleLog2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();             
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandlerConsoleLog2 = jest.spyOn(eventHandlerConsoleLog2, "handle");
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);        
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog2);        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerConsoleLog2);        

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Pedro Jose"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandlerConsoleLog2).toHaveBeenCalled();
    });
    

});