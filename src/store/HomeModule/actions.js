import HomeService from "@/services/home";
import { mutationType } from "./mutations";

const actions = {
  async setData({ commit }) {
    const data = await HomeService.getHomeData();
    commit(mutationType.GET_DATA, data);
  },
};

export default actions;
