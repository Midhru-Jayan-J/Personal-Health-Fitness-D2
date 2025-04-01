import pandas as pd
import google.generativeai as genai
import os
from dotenv import load_dotenv
import streamlit as st

# Load environment variables
load_dotenv()
gemini_api_key = os.environ["GEMINI_API_KEY"]
genai.configure(api_key=gemini_api_key)

# --- Dataset Loading ---
def load_exercise_data(csv_file):
    df = pd.read_csv(csv_file)
    return df 

exercise_data = load_exercise_data('megaGymDataset.csv')

# --- Gather User Preferences ---
def gather_user_preferences():
    goal = st.selectbox("What's your main fitness goal?", 
                        ["Weight Loss", "Build Muscle", "Endurance", "General Fitness"])
    experience = st.radio("What's your experience level?",
                          ["Beginner", "Intermediate", "Advanced"])
    restrictions = st.text_input("Any injuries or limitations? (Optional)")

    return {
        "goal": goal,
        "experience": experience,
        "restrictions": restrictions
    }

# --- Process User Queries with Gemini ---
def process_query(query, exercise_data, user_preferences):
    # Create a fitness expert prompt
    prompt = craft_fitness_prompt(query, exercise_data, user_preferences)
    
    # Call Google Gemini API
    model = genai.GenerativeModel("gemini-1.5-flash")  # Free-tier model
    response = model.generate_content(prompt)

    return response.text if response and hasattr(response, 'text') else "I'm sorry, I couldn't generate a response."

# --- Helper Functions ---
def craft_fitness_prompt(query, data, user_preferences):
    return f"""You are a fitness expert. Answer the user's fitness-related question in a helpful and clear manner.

    User Query: {query}

    User Preferences:
    - Goal: {user_preferences['goal']}
    - Experience Level: {user_preferences['experience']}
    - Injuries/Limitations: {user_preferences['restrictions']}
    
    Make sure to use scientifically backed knowledge.
    """

# --- Streamlit UI ---
st.title("Fitness Knowledge Bot")

user_preferences = gather_user_preferences()
user_input = st.text_input("Ask me about workouts or fitness...")

if st.button("Submit"):
    chatbot_response = process_query(user_input, exercise_data, user_preferences)
    st.write("Chatbot:", chatbot_response)
