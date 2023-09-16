import {faker} from '@faker-js/faker'

export const generateProduct =()=> {
    // Generador de productos aleatorios
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1, max: 20 }),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
    }
}

export const generateUser=()=> {
    const totalProducts = faker.number.int({ min: 1, max: 10 });
    const products = Array.from({length:totalProducts},()=>generateProduct());
    // Generador de usuarios aleatorios. 
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        gender: faker.person.gender(),
        birthDate: faker.date.birthdate(), 
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        products
    }
}