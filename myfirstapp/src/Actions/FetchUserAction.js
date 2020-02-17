import axios from 'axios';
export const fetchUserAction = ()=>{
	return(dispatch)=>{
		axios.get('api/getuser')
		.then(res1=>{
			console.log(res1)
			dispatch({type : 'GET_USER', payload : res1.data})
		})
	}
}