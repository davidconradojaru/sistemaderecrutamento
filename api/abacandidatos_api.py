from flask import Flask, request, jsonify, render_template  
from flask_cors import CORS  
import psycopg2  

app = Flask(__name__, template_folder='../templates') 
CORS(app)  

def get_database_connection():
    # Função para estabelecer uma conexão com o banco de dados PostgreSQL
    conn = psycopg2.connect(
        host="localhost",  
        database="recruit",  
        user="postgres",  
        password="1478963" 
    )
    return conn  # Retorna a conexão com o banco de dados




@app.route('/pesquisacandidato')
def pesquisar_candidato():
    city = request.args.get('city', '').strip().lower()
    position = request.args.get('position', '').strip().lower()
    query = request.args.get('query', '').strip().lower()  

    conn = get_database_connection()
    cursor = conn.cursor()

    # Montar a consulta com base nos filtros fornecidos
    base_query = "SELECT * FROM noval.curriculo WHERE 1=1"
    
    if query:
        base_query += " AND LOWER(nome) LIKE %s"
    if city:
        base_query += " AND LOWER(cidade) = %s"
    if position:
        base_query += " AND LOWER(cargo) = %s"

    # Preparar os parâmetros para a consulta
    params = []
    if query:
        params.append(f'%{query}%')
    if city:
        params.append(city)
    if position:
        params.append(position)
    
    try:
        cursor.execute(base_query, tuple(params))
        results = cursor.fetchall()
    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500  

    cursor.close()
    conn.close()

    # Processar e formatar os resultados
    candidatos = []
    for row in results:
        candidatos.append({
            "id": row[0],
            "onde_trabalhar": row[1],
            "cargo": row[2],
            "nome": row[3],
            "data_nascimento": row[4].strftime('%Y-%m-%d') if row[4] else None,
            "cpf": row[5],
            "telefone": row[6],
            "email": row[7],
            "estado_civil": row[8],
            "genero": row[9],
            "nacionalidade": row[10],
            "endereco": row[11],
            "numero": row[12],
            "bairro": row[13],
            "cep": row[14],
            "cidade": row[15],
            "nome_referencia": row[16],
            "telefone_referencia": row[17],
            "descricao_referencia": row[18],
            "descricao_locais": row[19],
            "descricao_experiencia": row[20],
            "formacao_academica": row[21],
            "formacao": row[22],
            "falesobrevoce": row[23],
            "created_at": row[24].strftime('%d/%m/%y %H:%M:%S') if row[24] else None
        })

    return jsonify(candidatos)




@app.route('/curriculo/<int:id>')
def curriculo(id):
    conn = get_database_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM noval.curriculo WHERE id = %s", (id,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if row:
        candidato = {
            "id": row[0],
            "onde_trabalhar": row[1],
            "cargo": row[2],
            "nome": row[3],
            "data_nascimento": row[4].strftime('%Y-%m-%d') if row[4] else None,
            "cpf": row[5],
            "telefone": row[6],
            "email": row[7],
            "estado_civil": row[8],
            "genero": row[9],
            "nacionalidade": row[10],
            "endereco": row[11],
            "numero": row[12],
            "bairro": row[13],
            "cep": row[14],
            "cidade": row[15],
            "nome_referencia": row[16],
            "telefone_referencia": row[17],
            "descricao_referencia": row[18],
            "descricao_locais": row[19],
            "descricao_experiencia": row[20],
            "formacao_academica": row[21],
            "formacao": row[22],
            "falesobrevoce": row[23],
            "created_at": row[24].strftime('%d/%m/%y %H:%M:%S') if row[24] else None
        }
        return render_template('curriculo.html', candidato=candidato)
    else:
        return "Currículo não encontrado", 404

if __name__ == '__main__': 
    app.run(debug=True)  
