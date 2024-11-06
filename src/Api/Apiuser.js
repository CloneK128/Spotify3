import axiosclient from "./Axioclient";
const Apiuser={
    apiLogin(data){
        const url='/identity/auth/token'
        return axiosclient.post(url,data);
    }
}
export default Apiuser