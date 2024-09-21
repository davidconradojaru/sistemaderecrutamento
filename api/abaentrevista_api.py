from flask import Flask, request, jsonify, render_template  
from flask_cors import CORS  
import psycopg2
from abacandidatos_api import get_database_connection


app = Flask(__name__, template_folder='../templates') 
CORS(app)  


@app.route('/curriculo/<int:id>/entrevista', methods=['POST'])
def alterar_entrevista(id):
    conn = get_database_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("UPDATE noval.curriculo SET chamar_entrevista = TRUE WHERE id = %s", (id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            return "Currículo não encontrado", 404

        return jsonify({'status': 'sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
