import fs from 'fs'
import { json } from 'stream/consumers';
import { UserModel } from '../models/user.model';
export function generateRandomNumber(min: number, max: number):number {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);

}
export function saveJsonData(jsonObject: Object, fileUrl: string):void {
    let userDataArray: object[] = [];
    if (fs.existsSync(fileUrl)) {
        const fileContent = fs.readFileSync(fileUrl, "utf-8"); // read JSON array
        userDataArray = JSON.parse(fileContent); // json string to josn object

    }
    userDataArray.push(jsonObject);
    fs.writeFileSync(fileUrl, JSON.stringify(userDataArray, null, 2))

}
export function getLastUser(fileUrl: string): UserModel {
    const fileContent = fs.readFileSync(fileUrl, "utf-8");
    let userDataArray = JSON.parse(fileContent);
    return userDataArray[userDataArray.length - 1];

}