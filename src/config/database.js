import { connect } from 'mongoose';



export async function connectDb() {
	try{
		await connect('mongodb+srv://lvegar5:jW63ZrWpV4JclxdC@cluster0.lrmbuuk.mongodb.net/?retryWrites=true&w=majority');
        console.log('conecto bien')
	}catch(e){
		console.log('Error : ', e);
	}

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}