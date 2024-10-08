PGDMP  +    ;                |            recruit    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    41141    recruit    DATABASE     ~   CREATE DATABASE recruit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE recruit;
                postgres    false                        2615    41142    noval    SCHEMA        CREATE SCHEMA noval;
    DROP SCHEMA noval;
                postgres    false            �            1259    41144 	   curriculo    TABLE     �  CREATE TABLE noval.curriculo (
    id integer NOT NULL,
    onde_trabalhar character varying(255) NOT NULL,
    cargo character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    data_nascimento date NOT NULL,
    cpf character varying(14) NOT NULL,
    telefone character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    estado_civil character varying(50) NOT NULL,
    genero character varying(50) NOT NULL,
    nacionalidade character varying(100) NOT NULL,
    endereco character varying(255) NOT NULL,
    numero character varying(10) NOT NULL,
    bairro character varying(100) NOT NULL,
    cep character varying(10) NOT NULL,
    cidade character varying(100) NOT NULL,
    nome_referencia character varying(255) NOT NULL,
    telefone_referencia character varying(20) NOT NULL,
    descricao_referencia text NOT NULL,
    descricao_locais text NOT NULL,
    descricao_experiencia text NOT NULL,
    formacao_academica character varying(255) NOT NULL,
    formacao text,
    falesobrevoce text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    chamar_entrevista boolean DEFAULT false
);
    DROP TABLE noval.curriculo;
       noval         heap    postgres    false    7                        0    0    TABLE curriculo    ACL     -   GRANT ALL ON TABLE noval.curriculo TO david;
          noval          postgres    false    218            �            1259    41143    curriculo_id_seq    SEQUENCE     �   CREATE SEQUENCE noval.curriculo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE noval.curriculo_id_seq;
       noval          postgres    false    218    7            !           0    0    curriculo_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE noval.curriculo_id_seq OWNED BY noval.curriculo.id;
          noval          postgres    false    217            �           2604    41147    curriculo id    DEFAULT     j   ALTER TABLE ONLY noval.curriculo ALTER COLUMN id SET DEFAULT nextval('noval.curriculo_id_seq'::regclass);
 :   ALTER TABLE noval.curriculo ALTER COLUMN id DROP DEFAULT;
       noval          postgres    false    217    218    218                      0    41144 	   curriculo 
   TABLE DATA           g  COPY noval.curriculo (id, onde_trabalhar, cargo, nome, data_nascimento, cpf, telefone, email, estado_civil, genero, nacionalidade, endereco, numero, bairro, cep, cidade, nome_referencia, telefone_referencia, descricao_referencia, descricao_locais, descricao_experiencia, formacao_academica, formacao, falesobrevoce, created_at, chamar_entrevista) FROM stdin;
    noval          postgres    false    218   P       "           0    0    curriculo_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('noval.curriculo_id_seq', 6, true);
          noval          postgres    false    217            �           2606    41154    curriculo curriculo_cpf_key 
   CONSTRAINT     T   ALTER TABLE ONLY noval.curriculo
    ADD CONSTRAINT curriculo_cpf_key UNIQUE (cpf);
 D   ALTER TABLE ONLY noval.curriculo DROP CONSTRAINT curriculo_cpf_key;
       noval            postgres    false    218            �           2606    41152    curriculo curriculo_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY noval.curriculo
    ADD CONSTRAINT curriculo_pkey PRIMARY KEY (id);
 A   ALTER TABLE ONLY noval.curriculo DROP CONSTRAINT curriculo_pkey;
       noval            postgres    false    218               :  x����n�F�ϫ��c�I���S)E�cH�`�nc�2&W�$W]R��[��!@���>�^�ߒ�%ي�:P�ο��|�a<��cv'�T�J�K��[�����Q?���r�z]�B�׏,�ao\��G�^X~�s�'E�.��O��e&�D��Fe��Z��6�2Ye�Pl�	G���xl��(*�̣Xa��&5!-�O3��zt�h%*�����>*6ʗZ��=���]y�4�+�|1E�I���-��vO�L(U\�VTɵb����ӷ�.w�3?:���(r�]��;!��M��Ĭ�ȹ�Ϸ��)�\R񔞀F��[��	���*͜dv����Os�(P�:冩�X�q]�1U�h���hMN�I�8Z^-��6N-����E"��.U�3��,�-U-mY$�J@�Єn����\%�Bejaq���jY>��c�éPeL��X�l-sԩ��RͫϤ�)_��2AӺ��Del`��+���ϢK���J��	��|�1&¨X��c
7[�|)2�?u�2%��C�Z�6��?]�*7Y�eYJUP�iI�O`�T��v�u�ds��v�/7�2D��9��#��#��,Gf����9�y��E������bt�IVJ��d���lk�΅.�<�c�����p-�c[m�1B�>��	�f��[3;�فB�D��"�Ş<�kQ���?]�q;ѽ��5��{���:�&x�Z��q�<�?��OU7�p8;����DZ���K�f�o�uTU���?�ň����E���	�&i�_�l������v�u}��:a��Q�]��f�u|��	�}%X��1��zԵ<�A~�0�m�O�@�;�O�1*�.�����f*؀��NX-x�q���L��m۳�CA����b���m`���?��JK�2cN��|���lz};�w��Ŕ�m��)�� :C�&�)W�rz�	Ϛ+�����5J��fv^���Չ��g
L��u'�JW��n��)�Wh!����I"q�7�����sB3b{�\�k�+�w��i��D-���	����g@9ڏ�a�������vS���pQ�*�$����.�,��6���v�;�ٝN�?�g�t     