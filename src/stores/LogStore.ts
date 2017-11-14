import {observable, action, runInAction} from 'mobx';
import { LogModel } from '../models';
import Axios from 'axios';
import { LogAxiosConfig } from '../constants/config';

export class LogStore {

    @observable public logs: Array<LogModel>;
    @observable public tmp: Array<LogModel>

    constructor(fixtures: LogModel[]) {
        this.logs = fixtures;
        this.tmp = [];
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~ Store Methods binding  ~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.addLog = this.addLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
        this.editLog = this.editLog.bind(this);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~ API Methods binding  ~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.getAPI     = this.getAPI.bind(this);
        this.postAPI    = this.postAPI.bind(this);
        this.putAPI     = this.putAPI.bind(this);
        this.deleteAPI  = this.deleteAPI.bind(this);

        // Get Init data from server
        // this.getAPI();

        //TODO : As long as I don't have a interval method to get all data from server,
        // I should call the method getAPI again after every change I do in the locale 'cache'(Update/Delete)

        //~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.getDbAPI       = this.getDbAPI.bind(this);
        this.postDbAPI      = this.postDbAPI.bind(this);
        this.putDbAPI       = this.putDbAPI.bind(this);
        this.deleteDbAPI    = this.deleteDbAPI.bind(this);
        //~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.getDbAPI();
    }

    //<editor-fold> desc="API request when data is in server"
    @action("Get all log-datas from server")
    getAPI(){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.get('/logs/')
            .then(//this.updateTestData
                (response) => {
                    // response = Array of JSON objects
                    runInAction(() => {
                        this.logs = response.data;
                    })
                }
            )
            .catch( (error) =>{
                console.log(error);
            });
    }

    @action("Add log-data to server")
    postAPI(newLog: LogModel){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.post('/logs/',{
                LogObject:  newLog
            })
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getAPI();
            })
            .catch( (error) =>{
                console.log(error)
            });
    }

    @action("Edit log-data in the server")
    putAPI(newLog: LogModel){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.put('/logs/' + newLog.id,{
                LogObject:  newLog,
            })
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getAPI();
            })
            .catch( (error) =>{
                console.log(error);
            });
    }

    @action("Delete log-data from the server")
    deleteAPI(id: string){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.delete('/logs/' + id)
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getAPI();
            })
            .catch( (error) =>{
                console.log(error)
            });
    }
    //</editor-fold

    //<editor-fold desc=" API requests when data is in MongoDB">

    @action("Testing something cool #1")
    getDbAPI(){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.get('/bears/')
            .then(//this.updateTestData
                (response) => {
                    // response = Array of JSON objects
                    runInAction(() => {
                        this.logs = response.data;
                    })
                }
            )
            .catch( (error) =>{
                console.log(error);
            });
    }

    @action("Testing something cool #2")
    postDbAPI(newLog: LogModel){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.post('/bears/',{
            LogObject:  newLog
            })
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getDbAPI();
            })
            .catch( (error) =>{
                console.log(error)
            });
    }

    @action("Testing something cool #3")
    putDbAPI(newLog: LogModel){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.put('/bears/' + newLog.id,{
            LogObject:  newLog,
        })
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getDbAPI();
            })
            .catch( (error) =>{
                console.log(error);
            });
    }

    @action("Testing something cool #4")
    deleteDbAPI(id: string){
        let axiosInstance = Axios.create( LogAxiosConfig );
        axiosInstance.delete('/bears/' + id)
            .then( (response) => {
                // response = JSON object
                console.log(response.data.message);
                this.getDbAPI();
            })
            .catch( (error) =>{
                console.log(error)
            });
    }

    //</editor-fold>

    //<editor-fold desc="LogStore's methods">
    @action("Adding new log")
    addLog(item: LogModel): void {
        // this.postAPI(item);
        this.postDbAPI(item);
    }

    @action("Editing a specific log")
    editLog(data: LogModel): void {
        // this.putAPI(data);
        this.putDbAPI(data);
    }

    @action("Deleting specific log")
    deleteLog(id: string): void {
        // this.deleteAPI(id);
        this.deleteDbAPI(id)
    }
    //</editor-fold>

}

export default LogStore;
