import { FilterPipe } from './filter.pipe';

fdescribe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return array of hotel that names contain empty string', () => {
    const pipe = new FilterPipe();

    const result = pipe.transform([
      {
        'name': 'Le Meridien', 'price': 89.6,
        'city': 'london', 'availability':
          [{ 'from': new Date('10/05/2020'), 'to': new Date('11/10/2020') }]
      }
    ], '', 100);

    const expectedResult = [
      {
        'name': 'Le Meridien', 'price': 89.6,
        'city': 'london', 'availability':
          [{ 'from': new Date('10/05/2020'), 'to': new Date('11/10/2020') }]
      }
    ]
    expect(result).toEqual(expectedResult);
  })
  it('should return array of hotel that names contain empty string and price between min and max', () => {
    const pipe = new FilterPipe();

    const result = pipe.transform([
      {
        'name': 'Le Meridien', 'price': 89.6,
        'city': 'london', 'availability':
          [{ 'from': new Date('10/05/2020'), 'to': new Date('11/10/2020') }]
      }
    ], '', 100);

    const expectedResult = [
      {
        'name': 'Le Meridien', 'price': 89.6,
        'city': 'london', 'availability':
          [{ 'from': new Date('10/05/2020'), 'to': new Date('11/10/2020') }]
      }
    ]
    expect(result).toEqual(expectedResult);
  })
});
