import json
import re
import unicodedata
import random

# -----------------------------
# 1. Cargar JSON
# -----------------------------
with open("connie.json", "r", encoding="utf-8") as f:
    data = json.load(f)

kb = data["knowledge_base"]

# -----------------------------
# 2. Preprocesamiento
# -----------------------------
def preprocess(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text.split()

# -----------------------------
# 3. Buscar mejor respuesta
# -----------------------------
def get_best_response(user_input):
    user_words = preprocess(user_input)

    best_score = 0
    best_answer = None

    for topic in kb:
        if topic == "meta":
            continue

        for entry in kb[topic]:
            for pattern in entry["patterns"]:
                pattern_words = preprocess(pattern)

                # comparar coincidencias
                common = set(user_words) & set(pattern_words)
                score = len(common)

                if score > best_score:
                    best_score = score
                    best_answer = entry["answer"]

    if best_score == 0:
        return "Mmm… no te entendí bien 😅 ¿me lo dices de otra forma?"

    return best_answer

# -----------------------------
# 4. Personalidad Connie 60/40
# -----------------------------
def add_personality(response):
    friendly = [
        "¡Hey! 💛 ",
        "¡Te ayudo! 😊 ",
        "Tranqui, mira: ",
        "Todo bien, aquí va: "
    ]

    sassy = [
        "Mira… 😏 ",
        "No es por nada pero 😌 ",
        "Te lo dejo fácil: ",
        "Ajá… importante: "
    ]

    if random.random() < 0.4:  # 40% sassy
        return random.choice(sassy) + response
    else:
        return random.choice(friendly) + response

# -----------------------------
# 5. Chat loop
# -----------------------------
def chat():
    print("Connie 🚗✨: ¡Hola! Soy Connie, tu copiloto del examen. ¿Qué quieres saber?")

    while True:
        user_input = input("Tú: ")

        if user_input.lower() in ["salir", "exit", "bye"]:
            print("Connie: ¡Bye! Maneja bonito 💛")
            break

        response = get_best_response(user_input)
        final = add_personality(response)

        print("Connie:", final)

# -----------------------------
# 6. Ejecutar
# -----------------------------
if __name__ == "__main__":
    chat()