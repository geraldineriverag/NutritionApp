import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert,
    Linking,
} from 'react-native';
import { getMyNutritionPlan, NutritionPlan } from '../../services/NutritionPlanService';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import ButtonApp from '../../components/ButtonApp';

const PatientPlanScreen: React.FC = () => {
    const [plan, setPlan] = useState<NutritionPlan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const myPlan = await getMyNutritionPlan();
                setPlan(myPlan);
            } catch (e: any) {
                Alert.alert('Info', e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!plan) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <Text>No tienes un plan asignado todavía.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.title}>Mi Plan Nutricional</Text>

            <View style={cardStyles.card}>
                <Text style={cardStyles.cardTitle}>Plan de comidas</Text>
                <Text style={cardStyles.cardValue}>{plan.meal_plan}</Text>
            </View>

            <View style={cardStyles.card}>
                <Text style={cardStyles.cardTitle}>Calorías diarias</Text>
                <Text style={cardStyles.cardValue}>{plan.calories} kcal</Text>
            </View>

            <View style={cardStyles.card}>
                <Text style={cardStyles.cardTitle}>Necesidades basales</Text>
                <Text style={cardStyles.cardValue}>{plan.caloric_needs} kcal</Text>
            </View>

            {plan.protein != null && (
                <View style={cardStyles.card}>
                    <Text style={cardStyles.cardTitle}>Proteína</Text>
                    <Text style={cardStyles.cardValue}>{plan.protein} g</Text>
                </View>
            )}

            {plan.carbs != null && (
                <View style={cardStyles.card}>
                    <Text style={cardStyles.cardTitle}>Carbohidratos</Text>
                    <Text style={cardStyles.cardValue}>{plan.carbs} g</Text>
                </View>
            )}

            {plan.fats != null && (
                <View style={cardStyles.card}>
                    <Text style={cardStyles.cardTitle}>Grasas</Text>
                    <Text style={cardStyles.cardValue}>{plan.fats} g</Text>
                </View>
            )}

            {plan.review_date && (
                <View style={cardStyles.card}>
                    <Text style={cardStyles.cardTitle}>Revisión</Text>
                    <Text style={cardStyles.cardValue}>
                        {new Date(plan.review_date).toLocaleDateString()}
                    </Text>
                </View>
            )}

            {plan.pdf_plan && (
                <ButtonApp
                    title="Ver PDF del plan"
                    onPress={() => Linking.openURL(plan.pdf_plan!)}
                />
            )}
        </ScrollView>
    );
};

export default PatientPlanScreen;
