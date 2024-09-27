// src/LandingPage.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage: React.FC = () => {
    const navigation = useNavigation();
    const handleLoginPress = () => {
        navigation.navigate('Login');
      };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Your Journaling App</Text>
            </View>

            <View style={styles.hero}>
                <Text style={styles.heroText}>Capture Your Thoughts, One Day at a Time</Text>
                <Button title="Get Started" 
                onPress={handleLoginPress} />
            </View>

            <View style={styles.features}>
                <Text style={styles.sectionTitle}>Features</Text>

                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Easy to Use</Text>
                    <View style={styles.featureContent}>
                        <View style={styles.notesContainer}>
                            <Text style={styles.featureDescription}>
                                Our intuitive interface makes journaling effortless.
                            </Text>
                            <Text style={styles.notes}>
                                - It makes your Journalling interesting{"\n"}
                                - if you looking for quick options, here you go!
                            </Text>
                        </View>
                        <Image
                            source={{ uri: 'https://media.istockphoto.com/id/1550540247/photo/decision-thinking-and-asian-man-in-studio-with-glasses-questions-and-brainstorming-on-grey.webp?a=1&b=1&s=612x612&w=0&k=20&c=S_OkPNG0sRlZrTAgJSMcDcivp6E-RJSWOf9vX3AEkgc=' }} 
                            style={styles.featureImage}
                        />
                    </View>
                </View>

                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Secure</Text>
                    <View style={styles.featureContent}>
                        <View style={styles.notesContainer}>
                            <Text style={styles.featureDescription}>
                                Your thoughts are safe with us, protected by encryption.
                            </Text>
                            <Text style={styles.notes}>
                                - End-to-end encryption{"\n"}
                                - Regular security updates
                            </Text>
                        </View>
                        <Image
                            source={{ uri: 'https://plus.unsplash.com/premium_photo-1676166011970-bdea4f34674e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVmbGVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D' }} 
                            style={styles.featureImage}
                        />
                    </View>
                </View>

                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Daily Reminders</Text>
                    <View style={styles.featureContent}>
                        <View style={styles.notesContainer}>
                            <Text style={styles.featureDescription}>
                                Stay on track with daily notifications to write.
                            </Text>
                            <Text style={styles.notes}>
                                - Customizable reminder times{"\n"}
                                - Motivational quotes
                            </Text>
                        </View>
                        <Image
                            source={{ uri: 'https://plus.unsplash.com/premium_photo-1680506340770-48b2230c92b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlZmxlY3Rpb258ZW58MHx8MHx8fDA%3D' }} 
                            style={styles.featureImage}
                        />
                    </View>
                </View>

                <View style={styles.benefits}>
                    <Text style={styles.sectionTitle}>Why You Should Journal</Text>
                    <Text style={styles.benefitDescription}>
                        Journaling has numerous benefits, including:
                    </Text>
                    <Text style={styles.benefitItem}>1. Self-Reflection: Understand yourself better.</Text>
                    <Text style={styles.benefitItem}>2. Emotional Clarity: Process your feelings effectively.</Text>
                    <Text style={styles.benefitItem}>3. Goal Setting: Track and evaluate your goals.</Text>
                    <Text style={styles.benefitItem}>4. Creativity Boost: Explore new ideas and thoughts.</Text>
                    <Text style={styles.benefitItem}>5. Problem Solving: Work through challenges.</Text>
                    <Text style={styles.benefitItem}>6. Stress Reduction: Find relief from anxiety.</Text>
                    <Text style={styles.benefitItem}>7. Memory Enhancement: Improve recall of important events.</Text>
                    <Text style={styles.benefitItem}>8. Mindfulness Practice: Stay present and focused.</Text>
                    <Text style={styles.benefitItem}>9. Documenting Growth: Record your progress over time.</Text>
                    <Text style={styles.benefitItem}>10. Enhanced Communication Skills: Express yourself clearly.</Text>
                </View>
            </View>

            <View style={styles.testimonials}>
                <Text style={styles.sectionTitle}>What Our Users Say</Text>
                <Text style={styles.testimonial}>“This app has changed my life!” - User A</Text>
                <Text style={styles.testimonial}>“I love journaling again, thanks to this app!” - User B</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    &copy; 2024 Your Journaling App. All rights reserved.
                </Text>
                <Text style={styles.footerLink}>Privacy Policy</Text>
                <Text style={styles.footerLink}>Terms of Service</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa', 
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    hero: {
        alignItems: 'center',
        marginBottom: 40,
    },
    heroText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333', 
    },
    features: {
        marginBottom: 40,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feature: {
        marginBottom: 20,
    },
    featureContent: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
    },
    notesContainer: {
        flex: 1, 
        paddingRight: 10, 
    },
    featureImage: {
        width: 600, 
        height: 300, 
        borderRadius: 10,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
    },
    featureDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'left',
    },
    notes: {
        fontSize: 14,
        color: '#444',
        marginTop: 5,
        lineHeight: 20,
    },
    testimonials: {
        marginBottom: 40,
    },
    testimonial: {
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#555',
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
    footerLink: {
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    benefits: {
        marginBottom: 40,
    },
    benefitDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textAlign: 'left',
    },
    benefitItem: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
        lineHeight: 20,
    },
});

export default LandingPage;
