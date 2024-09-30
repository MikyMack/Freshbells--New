import axios from "../axios";
import { API_URLS } from '../constants/config';

export const HealthyDietsWeightLoss=async()=>{
    try {
        const response=await axios.get(API_URLS.WEIGHT_LOSS);
        console.log(response.data,"sghfvsgdvgf");
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weightloss");
        throw error;
    }
}
export const HealthyDietsWeightGain=async()=>{
    try {
        const response=await axios.get(API_URLS.WEIGHT_GAIN);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const SpecialCategPcod=async()=>{
    try {
        const response=await axios.get(API_URLS.PCOD);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const SpecialCategDiabeties=async()=>{
    try {
        const response=await axios.get(API_URLS.PCOD);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const SpecialCategLactatingMothers=async()=>{
    try {
        const response=await axios.get(API_URLS.LACTATING_MOTHERS);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const SpecialCategExpectantMothers=async()=>{
    try {
        const response=await axios.get(API_URLS.EXPECTANT_MOTHERS);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const SpecialCategDlutenFree=async()=>{
    try {
        const response=await axios.get(API_URLS.GLUTEN_FREE);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const DietPlansForAgeWeaning=async()=>{
    try {
        const response=await axios.get(API_URLS.WEANING);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const DietPlansForSchoolGoing=async()=>{
    try {
        const response=await axios.get(API_URLS.SCHOOL_GOING);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}
export const DietPlansForAdults=async()=>{
    try {
        const response=await axios.get(API_URLS.ADULTS);
        return response.data;
    } catch (error) {
        console.error("Error fetching meal plans weight gain");
        throw error;
    }
}