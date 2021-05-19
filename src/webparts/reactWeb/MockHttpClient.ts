import { ISPList } from './ReactWebWebPart';

export default class MockHttpClient  {

  private static _items: ISPList[] = [{ Title: 'Mock List'},
                                      { Title: 'Mock List 2'},
                                      { Title: 'Mock List 3' }];

  public static get(): Promise<ISPList[]> {
    return new Promise<ISPList[]>((resolve) => {
      resolve(MockHttpClient._items);
    });
  }
}