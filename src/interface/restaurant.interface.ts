export interface IAddRestaurant {
   name: string;
   city: string;
   address: string;
   image?: string;
   categories: string;
   registrationNumber: string;
}

export interface IFood {
   name: string;
   city: string;
   address: string;
   categories: string;
   registrationNumber: string;
   image?: string;
}

export interface IRestaurant {
   name?: string;
   city?: string;
   address?: string;
   image?: string;
   categories?: string[];
   registrationNumber?: string;
   rating?: number;
   ratingsCount?: number;
   admin?: string;
   isVerified?: boolean;
   foods?: {
      // Virtual field
      _id: string;
   }[];
   createAt?: Date;
   updatedAt?: Date;
}
export interface IVocab {
   _id: string;
   title: string;
   phonetics?: string;
   audio?: string | any;
   audioFile?: File;
   type?: string;
   definition?: string;
   example?: string;
   is_disable?: Boolean;
   true_guess_count?: Number;
   completed?: Boolean;
}


