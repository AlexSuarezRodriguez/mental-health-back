const {
    getAllChistory,
    getOneChistory,
    createChistory,
    upadateChistory,
    deleteChistory 
}= require ('../clinicHistory.service')


describe('ClinicHistory service', ()=>{
    beforeAll (async ()=>{
        await connectDB();
      });
    describe('createChistory', ()=>{
        test('should create a clinicHistory object', () => {
            const clinicH = createChistory();
            expect(clinicH).toEqual({
                id:"1",
                description: "hacer ejercicio",
            });
         });
         test('should return a clinicHistory object', () => {
            const clinicH = createChistory(1);
            expect(clinicH).toEqual({
                id:"1",
                description: "hacer ejercicio",
            });
         });
         test ('should return null when clinicHistory is not found', ()=>{
            const clinicH = createChistory(2);
            expect(clinicH).toBeNull();
        });
     });
    describe('getOneChistory', ()=>{
        test('should return a clinicHistory object', () => {
            const clinicH = getOneChistory(1);
            expect(clinicH).toEqual({
                id:"1",
                description: "hacer ejercicio",
            });
         });
        test ('should return null when clinicHistory is not found', ()=>{
            const clinicH = getOneChistory(100);
            expect(clinicH).toBeNull();
        });
    });
    describe ('upadateChistory', ()=>{
        test('should return a clinicHistory object', ()=>{
            const clinicH = upadateChistory(1, {
                description:"description update"
            });
            expect(clinicH).toEqual({
                description:"description update"
            });
        });
        test('should return null when clinicHistory is not found', ()=>{
            const clinicH = upadateChistory(2, {
                description:"description update"
            });
            expect(clinicH).toBeNull();
        });
    });
    describe ('deleteChistory', ()=>{
        test('should return a clinicHistory object', () => {
            const clinicH = deleteChistory(1);
            expect(clinicH).toEqual({
                id:"1",
                description: "hacer ejercicio",
            });
         });
         test ('should return null when clinicHistory is not found', ()=>{
            const clinicH = deleteChistory(100);
            expect(clinicH).toBeNull();
        });
    });
});