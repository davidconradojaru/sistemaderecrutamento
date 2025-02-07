from flask import Flask, request, jsonify, render_template, send_from_directory
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
        base_query += " AND LOWER(onde_trabalhar) = %s"
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


#pagina ver
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


#RODAR PAGINAS
@app.route('/entradacurriculo')
def entradacurriculo():    
    return render_template('entrada_curriculo.html')

@app.route('/entrevista')
def pagina_entrevista():
    return render_template('entrevista.html')


@app.route('/home')
def pagina_home():
    return send_from_directory('..', 'home.html')

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


    conn = get_database_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM noval.curriculo WHERE chamar_entrevista = TRUE AND entrevista_efetuada = FALSE")
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

#EXIBIR PARA APROVACÕES
@app.route('/aprovacoes', methods=['GET'])
def listar_aprovacoes():    
    conn = get_database_connection()
    cursor = conn.cursor()

    query = """
    SELECT e.id, e.cargo, e.filial, e.nome_candidato, e.data_nascimento, e.cpf, e.telefone, 
    e.email, e.data_entrevista, c.entrevista_efetuada
    FROM noval.entrevistas e
    JOIN noval.curriculo c ON e.id = c.id
    WHERE c.entrevista_efetuada = TRUE AND c.chamar_entrevista = TRUE;
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    resultados = []
    for row in rows:
        resultados.append({
            "id": row[0],
            "cargo": row[1],
            "filial": row[2],
            "nome_candidato": row[3],
            "data_nascimento": row[4].strftime('%d/%m/%y') if row[4] else None,
            "cpf": row[5],
            "telefone": row[6],
            "email": row[7],
            "data_entrevista": row[8].strftime('%d/%m/%y %H:%M:%S') if row[8] else None,
            "entrevista_efetuada": row[9]         
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


# INSERINDO DADOS DE ENTREVISTA
@app.route('/insert_entrevista', methods=['POST'])
def insert_entrevista():
    data = request.json
    
    # Conexão com o banco de dados
    conn = get_database_connection()
    cursor = conn.cursor()
    
    try:
    #  Insert na tabela entrevistas (dados pessoais)
        cursor.execute(""" 
            INSERT INTO noval.entrevistas (cargo, filial, nome_candidato, data_nascimento, cpf, telefone, email, id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;  -- Retorna o ID da nova entrevista
        """, (
            data['cargo'], 
            data['Filial'], 
            data['nome'], 
            data['data_nascimento'], 
            data['cpf'], 
            data['telefone'], 
            data['email'],
            data['id_candidato']
        ))

        # Captura o ID da nova entrevista
        entrevista_id = cursor.fetchone()[0]

        # 2. Atualizar a coluna 'entrevista_efetuada' para TRUE
        cursor.execute("""
            UPDATE noval.curriculo
            SET entrevista_efetuada = TRUE
            WHERE id = %s;
        """, (entrevista_id,))

        # Verificação para Montador
        if data['cargo'] == 'Montador':  
            cursor.execute(""" 
                INSERT INTO noval.entrevista_montador (entrevista_id, moradia, planos_futuros, coisas_importantes, hobbies,
                    atualizacao, residencia, redes_sociais, ponto_forte, realizacao, cursos, horas_extras,
                    veiculo, caracteristicas, experiencia, novalar, obs)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                entrevista_id,  
                data['moradia'], 
                data['planos_futuros'], 
                data['coisas_importantes'],
                data['hobbies'], 
                data['atualizacao'], 
                data['residencia'], 
                data['redes_sociais'],
                data['ponto_forte'], 
                data['realizacao'], 
                data['cursos'], 
                data['horas_extras'],
                data['veiculo'], 
                data['caracteristicas'], 
                data['experiencia'], 
                data['novalar'],
                data['obs']
            ))

        # Verificação para Vendedor
        elif data['cargo'] == 'Vendedor':  
            cursor.execute(""" 
                INSERT INTO noval.entrevista_vendedor (entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia,
                    redes_sociais, ponto_forte, realizacao, desapontamento, experiencia, cursos, horas_extras, informatica,
                    vendas, confianca_cliente, estrategias_vendas, convencimento, redes_sociais2, gerente_vendas, novalar, obs)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
            """, (
                entrevista_id, 
                data['casa'],
                data['futuro'],
                data['importancia'],
                data['hobbies'],
                data['atualizado'],
                data['residencia'],
                data['redes_sociais'],
                data['ponto_forte'],
                data['realizacao'],
                data['desapontamento'],
                data['experiencia'],
                data['cursos'],
                data['horas_extras'],
                data['informatica'],
                data['vendas'],
                data['confianca_cliente'],
                data['estrategias_vendas'],
                data['convencimento'],
                data['redes_sociais2'],
                data['gerente_vendas'],
                data['novalar'],
                data['obs']
            ))
        
        elif data['cargo'] == 'Gerente de Loja':  
            cursor.execute("""
                INSERT INTO noval.entrevista_gerenteloja (
                    entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia,
                    redes_sociais, ponto_forte, realizacao, desapontamento, cursos, horas_extras, informatica,
                    tempo_trabalho, motivo_trabalho, relacionamento_cliente, gestao_equipe, convencer, redes_vendas,
                    caracteristicas_vendedor, mudanca, novalar, obs
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                entrevista_id, 
                data['casa'],
                data['futuro'],
                data['importancia'],
                data['hobbies'],
                data['atualizado'],
                data['residencia'],
                data['redes_sociais'],
                data['ponto_forte'],
                data['realizacao'],
                data['desapontamento'],
                data['cursos'],
                data['horas_extras'],
                data['informatica'],
                data['tempo_trabalho'],
                data['motivo_trabalho'],
                data['relacionamento_cliente'],
                data['gestao_equipe'],
                data['convencer'],
                data['redes_vendas'],
                data['caracteristicas_vendedor'],
                data['mudanca'],
                data['novalar'],
                data['obs']
            ))
        elif data['cargo'] == 'Crediarista':  
            cursor.execute("""
                INSERT INTO noval.entrevista_crediarista (
                    entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia,
                    redes_sociais, ponto_forte, realizacao, desapontamento, cursos, horas_extras, informatica,
                    tempo_trabalho, motivo_trabalho, relacionamento_equipe, estrategias, profissional_administrativo,
                    convencer, novalar, obs
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
            """, (
                entrevista_id, 
                data['casa'],
                data['futuro'],
                data['importancia'],
                data['hobbies'],
                data['atualizado'],  # Correspondente ao campo 'atualizacao_cred'
                data['residencia'],  # Correspondente ao campo 'residencia_cred'
                data['redes_sociais'],  # Correspondente ao campo 'redes_sociais_cred'
                data['ponto_forte'],  # Correspondente ao campo 'ponto_forte_cred'
                data['realizacao'],  # Correspondente ao campo 'realizacao_cred'
                data['desapontamento'],  # Correspondente ao campo 'desapontamento_cred'
                data['cursos'],  # Correspondente ao campo 'cursos_cred'
                data['horas_extras'],  # Correspondente ao campo 'horas_extras_cred'
                data['informatica'],  # Correspondente ao campo 'informatica_cred'
                data['tempo_trabalho'],  # Correspondente ao campo 'tempo_trabalho_cred'
                data['motivo_trabalho'],  # Correspondente ao campo 'motivo_trabalho_cred'
                data['relacionamento_equipe'],  # Correspondente ao campo 'relacionamento_equipe_cred'
                data['estrategias'],  # Correspondente ao campo 'estrategias_cred'
                data['profissional_administrativo'],  # Correspondente ao campo 'profissional_administrativo_cred'
                data['convencer'],  # Correspondente ao campo 'convencer_cred'
                data['novalar'],  # Correspondente ao campo 'novalar_cred'
                data['obs']  # Correspondente ao campo 'obs_cred'
            ))

            
        elif data['cargo'] == 'Auxiliar Administrativo':  
            cursor.execute("""
                INSERT INTO noval.entrevista_auxiliar_administrativo (
                    entrevista_id, moradia, futuro, importantes, hobbies, atualizacao, residencia,
                    redes_sociais, ponto_forte, cursos, horas_extras, software, office, relacionamento,
                    habilidades, discricao, novalar, obs
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                entrevista_id, 
                data['moradia'],
                data['futuro'],
                data['importantes'],
                data['hobbies'],
                data['atualizacao'],
                data['residencia'],
                data['redes_sociais'],
                data['ponto_forte'],
                data['cursos'],
                data['horas_extras'],
                data['software'],
                data['office'],
                data['relacionamento'],
                data['habilidades'],
                data['discricao'],
                data['novalar'],
                data['obs']
            ))
        elif data['cargo'] == 'Gerente Administrativo':  
            cursor.execute("""
                INSERT INTO noval.entrevista_gerente_administrativo (
                    entrevista_id, moradia, planos_futuro, coisas_importantes, hobbies, atualizado, residencia,
                    redes_sociais, ponto_forte, maior_realizacao, desapontamento, cursos, horas_extras, informacao,
                    tempo, motivo_gerente, relacionamento, estrategias, caracteristicas_administrativo, convencao,
                    novalar, obs
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                entrevista_id, 
                data['moradia'],
                data['planos_futuro'],
                data['coisas_importantes'],
                data['hobbies'],
                data['atualizado'],
                data['residencia'],
                data['redes_sociais'],
                data['ponto_forte'],
                data['maior_realizacao'],
                data['desapontamento'],
                data['cursos'],
                data['horas_extras'],
                data['informacao'],
                data['tempo'],
                data['motivo_gerente'],
                data['relacionamento'],
                data['estrategias'],
                data['caracteristicas_administrativo'],
                data['convencao'],
                data['novalar'],
                data['obs']
            ))
            
        elif data['cargo'] == 'Ajudante de Depósito':  
            cursor.execute("""
                INSERT INTO noval.entrevista_ajudante_deposito (
                    entrevista_id, residencia, planos_futuro, coisas_importantes, horas_vagas, atualizado, 
                    residencias_ultimos_5_anos, redes_sociais, ponto_forte, maior_realizacao, cursos_profissionalizantes, 
                    horas_extras, caracteristicas_ajudante, experiencia_deposito, conhece_novalar, obs
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                entrevista_id, 
                data['residencia'],
                data['planos_futuro'],
                data['coisas_importantes'],
                data['horas_vagas'],
                data['atualizado'],
                data['residencias_ultimos_5_anos'],
                data['redes_sociais'],
                data['ponto_forte'],
                data['maior_realizacao'],
                data['cursos_profissionalizantes'],
                data['horas_extras'],
                data['caracteristicas_ajudante'],
                data['experiencia_deposito'],
                data['conhece_novalar'],
                data['obs']
            ))


        # Commit das alterações
        conn.commit()

        return jsonify({'message': 'Entrevista salva com sucesso!', 'entrevista_id': entrevista_id}), 201

    except Exception as e:
        conn.rollback()
        print(f"Erro ao inserir entrevista: {e}")  # Mensagem de erro mais específica
        return jsonify({'error': 'Ocorreu um erro ao salvar a entrevista: ' + str(e)}), 500

    finally:
        # Fecha o cursor e a conexão
        cursor.close()
        conn.close()


@app.route('/entrevista_feita/<int:entrevista_id>', methods=['GET'])
def entrevista_feita(entrevista_id):
    return render_template('entrevista_feita.html', entrevista_id=entrevista_id)

#CONSULTAR E PASSAR DADOS PARA PAGINA ENTREVISTA_FEITA.HTML
@app.route('/get_entrevista_feita/<int:entrevista_id>', methods=['GET'])
def get_entrevistapagina(entrevista_id):
    conn = get_database_connection()
    cursor = conn.cursor()

    try:
        # Primeiro, busque os dados gerais da entrevista
        cursor.execute("SELECT * FROM noval.entrevistas WHERE id = %s;", (entrevista_id,))
        entrevista = cursor.fetchone()

        if entrevista is None:
            return jsonify({'error': 'Entrevista não encontrada'}), 404

    # Criando um dicionário com os dados gerais da entrevista de forma dinâmica
        entrevista_data = {}
        
        # Preenche o dicionário com o nome das colunas como chave e os dados como valor
        if entrevista:
            for idx, column in enumerate(cursor.description):
                entrevista_data[column[0]] = entrevista[idx]
        # Dados específicos do cargo
        cargo = entrevista_data.get('cargo')
        dados_especificos = {}

        # Buscando dados específicos com base no cargo
        cargo = entrevista_data.get('cargo')

        if cargo == 'Montador':
            cursor.execute("""
            SELECT entrevista_id, moradia, planos_futuros, coisas_importantes, hobbies, 
                atualizacao, residencia, redes_sociais, ponto_forte, realizacao, 
                cursos, horas_extras, veiculo, caracteristicas, experiencia, novalar, 
                obs, created_at FROM noval.entrevista_montador WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['montador_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Vendedor':
            cursor.execute("""
                SELECT entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia, redes_sociais, 
                    ponto_forte, realizacao, desapontamento, experiencia, cursos, horas_extras, informatica, vendas, 
                    confianca_cliente, estrategias_vendas, convencimento, redes_sociais2, gerente_vendas, novalar, 
                    obs, created_at
                FROM noval.entrevista_vendedor 
                WHERE entrevista_id = %s;""", (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['vendedor_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Gerente de Loja':
            cursor.execute("""
                SELECT entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia, redes_sociais, 
                    ponto_forte, realizacao, desapontamento, cursos, horas_extras, informatica, tempo_trabalho, 
                    motivo_trabalho, relacionamento_cliente, gestao_equipe, convencer, redes_vendas, caracteristicas_vendedor, 
                    mudanca, novalar, obs, created_at, updated_at
                FROM noval.entrevista_gerenteloja 
                WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['gerente_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Crediarista':
            cursor.execute("""
                SELECT entrevista_id, casa, futuro, importancia, hobbies, atualizado, residencia, redes_sociais, 
                    ponto_forte, realizacao, desapontamento, cursos, horas_extras, informatica, tempo_trabalho, 
                    motivo_trabalho, relacionamento_equipe, estrategias, profissional_administrativo, convencer, 
                    novalar, obs, created_at
                FROM noval.entrevista_crediarista 
                WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['crediarista_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Auxiliar Administrativo':
            cursor.execute("""
                SELECT entrevista_id, moradia, futuro, importantes, hobbies, atualizado, residencia, redes_sociais, 
                    ponto_forte, cursos, horas_extras, software, office, relacionamento, habilidades, descricao, 
                    novalar, obs, created_at
                FROM noval.entrevista_aux_administrativo 
                WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['aux_administrativo_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Gerente Administrativo':
            cursor.execute("""
                SELECT entrevista_id, moradia, planos_futuro, coisas_importantes, hobbies, atualizado, residencia, 
                    redes_sociais, ponto_forte, maior_realizacao, desapontamento, cursos, horas_extras, informacao, 
                    tempo, motivo_gerente, relacionamento, estrategias, caracteristicas_administrativo, convencao, 
                    novalar, obs, created_at
                FROM noval.entrevista_gerente_administrativo 
                WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['gerente_administrativo_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        elif cargo == 'Ajudante de Depósito':
            cursor.execute("""
                SELECT entrevista_id, residencia, planos_futuro, coisas_importantes, horas_vagas, atualizado, 
                    residencias_ultimos_5_anos, redes_sociais, ponto_forte, maior_realizacao, cursos_profissionalizantes, 
                    horas_extras, caracteristicas_ajudante, experiencia_deposito, conhece_novalar, obs, created_at
                FROM noval.entrevista_ajudante_deposito
                WHERE entrevista_id = %s;
            """, (entrevista_id,))
            dados_especificos = cursor.fetchone()
            if dados_especificos:
                entrevista_data['ajudante_deposito_dados'] = dict(zip([column[0] for column in cursor.description], dados_especificos))

        # Retorna os dados completos da entrevista (gerais e específicos)
        return jsonify(entrevista_data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/entrevista_feita/<int:candidato_id>', methods=['POST'])
def atualizar_aprovacao(candidato_id):
    # Obter dados do corpo da requisição
    data = request.get_json()
    aprovacao = data.get('aprovacao')

    # Verifica se o status está correto
    if aprovacao not in ['aprovado', 'recusado']:
        return jsonify({'error': 'Status inválido'}), 400

    conn = get_database_connection()
    cur = conn.cursor()

    # Atualiza a coluna 'aprovacao' para 'aprovado' ou 'recusado' no candidato com ID específico
    cur.execute("""
        UPDATE noval.curriculo
        SET aprovacao = %s
        WHERE id = %s;
    """, (aprovacao, candidato_id))
    
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': f'Candidato {aprovacao} com sucesso'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)