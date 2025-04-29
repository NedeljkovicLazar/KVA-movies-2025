import axios from 'axios'
import { MovieModel } from '../models/movie.model'

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'Movies'
    },
    validateStatus: (status: number) =>{
        return status === 200 
        //Samo ako je 200 vrati response
        //U ostalim slucajevima baci izuzetak
    }
})


export class MovieService {
    static async getMovies(page: number = 0) {
        return client.request({
        url: '/movie',
        method: 'GET',
        params: {
            'page': page,
            'sort': 'startDate,asc',
            'active': true
        }
    })
    }

    static async getAllMovies(pages: number = 3) {
        const results: MovieModel[] = []
      
        for (let i = 0; i < pages; i++) {
          const rsp = await MovieService.getMovies(i)
          results.push(...rsp.data)
        }
      
        return results
      }
      

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }
}