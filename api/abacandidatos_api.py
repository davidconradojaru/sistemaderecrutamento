from flask import Flask, request, jsonify, render_template  
from flask_cors import CORS
from datetime import datetime
import psycopg2



app = Flask(__name__, template_folder='../templates',static_folder="../static")
CORS(app)  

def get_database_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="recruit",
        user="postgres",
        password="1478963"
    )
    return conn 



@app.route('/pesquisacandidato')
def pesquisar_candidato():
    city = request.args.get('city', '').strip().lower()
    position = request.args.get('position', '').strip().lower()
    query = request.args.get('query', '').strip().lower()  
    chamar_entrevista = request.args.get('chamar_entrevista')
    sort = request.args.get('sort', 'desc')

    conn = get_database_connection()
    cursor = conn.cursor()

    base_query = "SELECT * FROM noval.curriculo WHERE 1=1"
    
    if query:
        base_query += " AND LOWER(nome) LIKE %s"
    if city:
        base_query += " AND LOWER(cidade) = %s"
    if position:
        base_query += " AND LOWER(cargo) = %s"
    if chamar_entrevista:
        # Adiciona o filtro para chamar_entrevista
        if chamar_entrevista.lower() == 'sim':
            base_query += " AND chamar_entrevista = TRUE"
        elif chamar_entrevista.lower() == 'nao':
            base_query += " AND chamar_entrevista = FALSE"
        
    base_query += " ORDER BY created_at " + ('DESC' if sort == 'desc' else 'ASC')

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
            "created_at": row[24].strftime('%d/%m/%y %H:%M:%S') if row[24] else None,
            "chamar_entrevista": row[25]
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
            "created_at": row[24].strftime('%d/%m/%y %H:%M:%S') if row[24] else None,
            "chamar_entrevista": row[25]
        }
        return render_template('curriculo.html', candidato=candidato)
    else:
        return "Currículo não encontrado", 404


#RODAR PAGINA DE ENVIAR CURRICULO ENTRADA DOS DADOS
@app.route('/entradacurriculo')
def entradacurriculo():    
    return render_template('entrada_curriculo.html')

#ROTA PARA BOTÃO CHAMAR ENTREVISTA
@app.route('/curriculo/<int:id>/chama_entrevista', methods=['POST'])
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

#ROTA PARA EXIBIR NA ABA ENTREVISTA SE NO BD COLUNA CHAMAR_ENTREVISTA FOR TRUE
@app.route('/entrevistas', methods=['GET'])
def listar_entrevistas():    

#VERIRIFICA CPF EXISTENTE NA ENTRADA E PERGUNTA AO USUARIO
    conn = get_database_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM noval.curriculo WHERE chamar_entrevista = TRUE")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    resultados = []
    for row in rows:
        resultados.append({
            "id": row[0],
            "onde_trabalhar": row[1],
            "cargo": row[2],
            "nome": row[3],
            "created_at": row[24].strftime('%d/%m/%y %H:%M:%S') if row[24] else None
        })

    return jsonify(resultados)




#ENDPOINT PARA CONSULTAR ENTREVISTA ANTES DE CHAMAR BOTÃO DE CHAMA ENTREVISTA
@app.route('/curriculo/<int:id>/status_entrevista', methods=['GET'])
def status_entrevista(id):
    conn = get_database_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT chamar_entrevista FROM noval.curriculo WHERE id = %s", (id,))
        row = cursor.fetchone()
        
        if row:
            chamar_entrevista = row[0]  # Assume que chamar_entrevista é um booleano
            return jsonify({"chama_entrevista": "sim" if chamar_entrevista else "não"}), 200
        else:
            return jsonify({"error": "Currículo não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()
        

@app.route('/entradadados_curriculo', methods=['POST'])
def enviar_curriculo():
    data = request.json

    # Extraindo dados do JSON recebido
    nome = data.get('nome')
    data_nascimento = data.get('data_nascimento')
    cpf = data.get('cpf')
    telefone = data.get('telefone')
    email = data.get('email')
    estado_civil = data.get('estado_civil')
    genero = data.get('genero')
    nacionalidade = data.get('nacionalidade')
    endereco = data.get('endereco')
    numero = data.get('numero')
    bairro = data.get('bairro')
    cep = data.get('cep')
    cidade = data.get('cidade')
    nome_referencia = data.get('nome_referencia')
    telefone_referencia = data.get('telefone_referencia')
    descricao_referencia = data.get('descricao_referencia')
    descricao_locais = data.get('descricao_locais')
    descricao_experiencia = data.get('descricao_experiencia')
    formacao_academica = data.get('formacao_academica')
    formacao = data.get('formacao')
    falesobrevoce = data.get('falesobrevoce')
    onde_trabalhar = data.get('onde_trabalhar')
    cargo = data.get('cargo')

    conn = get_database_connection()
    cursor = conn.cursor()

    try:
        query = """
            INSERT INTO noval.curriculo (
                onde_trabalhar, cargo, nome, data_nascimento, cpf,
                telefone, email, estado_civil, genero, nacionalidade,
                endereco, numero, bairro, cep, cidade, nome_referencia,
                telefone_referencia, descricao_referencia, descricao_locais,
                descricao_experiencia, formacao_academica, formacao,
                falesobrevoce, created_at, chamar_entrevista
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            onde_trabalhar, cargo, nome, data_nascimento, cpf,
            telefone, email, estado_civil, genero, nacionalidade,
            endereco, numero, bairro, cep, cidade, nome_referencia,
            telefone_referencia, descricao_referencia, descricao_locais,
            descricao_experiencia, formacao_academica, formacao,
            falesobrevoce, datetime.now(), False  # chamar_entrevista default para false
        ))
        conn.commit()
        return jsonify({"message": "Currículo enviado com sucesso!"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)