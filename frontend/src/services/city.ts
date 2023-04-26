import type city from "@/types/city";
import api from "./api";
import type City from "@/types/city";
import type { AxiosResponse } from "axios";

class CityServices {
  async find(where: string): Promise<AxiosResponse<any, any>> {
    try {
      const finds = await api.get(`http://localhost:3001/city/find/${where}`);
      return finds.data;
    } catch (error) {
      console.log(error); // TODO
      throw error;
    }
  }
}

export default new CityServices();
