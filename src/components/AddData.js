import axios from 'axios';

export class AddData {
    
    getCarsSmall() {
        return axios.get('showcase/resources/data/cars-small.json')
                .then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('showcase/resources/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('showcase/resources/data/cars-large.json')
                .then(res => res.data.data);
    }
}

export default AddData;