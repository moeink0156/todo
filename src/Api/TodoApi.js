import axios from "axios";

let TodoApi = axios.create({
    baseURL: `https://reacttest-73bf3-default-rtdb.asia-southeast1.firebasedatabase.app/`
})

export default TodoApi