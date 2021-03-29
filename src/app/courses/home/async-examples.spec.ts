import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";


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

    it("Asynchronous test example - plain Promise", fakeAsync(() => {
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

    it("Asynchronous test example - Promises + setTimeout()", fakeAsync(() => {

        let counter = 0;

        Promise.resolve()
            .then(() => {

                counter += 10;

                setTimeout(() => {
                    counter += 1;
                }, 1000)
            });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        flush(1000);

        expect(counter).toBe(11);
    }));

    it("Aynchronous test example - Observables", fakeAsync(() => {
        let test = false;

        console.log('Creating observable');

        const test$ = of(test)
            .pipe(delay(1000));

        test$.subscribe(() => {
            test = true;
        });

        console.log("Running assertions");

        tick(1000);

        expect(test).toBe(true);
        
    }));
});