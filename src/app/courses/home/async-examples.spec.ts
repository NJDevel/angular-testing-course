import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { fake } from "cypress/types/sinon";


fdescribe("Async Testing Examples", () => {

    it('Asynchronous test example with Jasmine done()', (done: DoneFn)=> {
        let test = false;

        setTimeout(() => {
            console.log('running assertions');

            test = true;

            expect(test).toBeTruthy();

            done();
            
        }, 1000)
    });

    it("Asynchronous test example - setTimout()", fakeAsync(() => {
        let test = false;

        setTimeout(() => {});

        setTimeout(() => {
            console.log("running assertions for setTimeout() test");
            test = true;
            
        }, 1000);

        flush();

        expect(test).toBeTruthy();
    }));

    it("Asynchronous test example - plain Promis", fakeAsync(() => {
        let test = false;

        console.log("Creating Promise");

        Promise.resolve().then(() => {
            console.log('Promise evaluated succesfully');
            test = true;
            return Promise.resolve();
        })
            .then(() => {

                console.log('Promise second then() evaluated successfully');
                
                test = true;
            });

        flushMicrotasks();

        console.log('Running test assertions');

        expect(test).toBeTruthy();
        
        
    }));
});