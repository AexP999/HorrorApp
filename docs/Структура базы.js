
FilmsCollection

	id:Object
	name:string
	year: number
	country: string
	
	category: string
	director : {
		name : string
		rewards? : string []
	}
	actors : [
		{
			name : string
			sex : ENUM (male,female)
			rewards? : string []
		}
	]
	poster: string (URL)
	images : string [] (URL)
	trailer : string (URL)

UsersCollection
	id:Object
	name:string
	year_of_birth: number
	login: String
	password: String
	
ShowCollection

		user_id,
		film_id
		date: Date
		rating?: number
