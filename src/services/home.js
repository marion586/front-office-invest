export default class HomeService {
  static getHomeData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Test 1",
            description: "Lorem ipsum",
          },
        ]);
      }, 3000);
    });
  }
}
