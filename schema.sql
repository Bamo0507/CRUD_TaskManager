--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: actividad_estado_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.actividad_estado_enum AS ENUM (
    'PENDIENTE',
    'PROGRESO',
    'COMPLETADO'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actividad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actividad (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    estado public.actividad_estado_enum DEFAULT 'PENDIENTE'::public.actividad_estado_enum NOT NULL,
    dificultad integer DEFAULT 1 NOT NULL,
    "proyectoId" integer NOT NULL,
    "prioridadId" integer,
    tiempos_createdat timestamp without time zone DEFAULT now() NOT NULL,
    tiempos_inprogressat timestamp without time zone,
    tiempos_completedat timestamp without time zone,
    CONSTRAINT "CHK_ee1c11f3c543e2c266672aac28" CHECK (((dificultad >= 1) AND (dificultad <= 100)))
);


--
-- Name: actividad_etiquetas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actividad_etiquetas (
    "actividadId" integer NOT NULL,
    "etiquetaId" integer NOT NULL
);


--
-- Name: actividad_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.actividad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: actividad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.actividad_id_seq OWNED BY public.actividad.id;


--
-- Name: etiqueta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.etiqueta (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL
);


--
-- Name: etiqueta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.etiqueta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: etiqueta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.etiqueta_id_seq OWNED BY public.etiqueta.id;


--
-- Name: prioridad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prioridad (
    id integer NOT NULL,
    nivel character varying(30) NOT NULL
);


--
-- Name: prioridad_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.prioridad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prioridad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.prioridad_id_seq OWNED BY public.prioridad.id;


--
-- Name: proyecto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyecto (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL
);


--
-- Name: proyecto_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proyecto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proyecto_id_seq OWNED BY public.proyecto.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


--
-- Name: vw_actividades; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.vw_actividades AS
SELECT
    NULL::integer AS id,
    NULL::character varying(50) AS nombre_actividad,
    NULL::public.actividad_estado_enum AS estado,
    NULL::integer AS dificultad,
    NULL::character varying(30) AS prioridad,
    NULL::character varying(50) AS proyecto,
    NULL::timestamp without time zone AS "tiemposCreatedat",
    NULL::timestamp without time zone AS "tiemposInprogressat",
    NULL::timestamp without time zone AS "tiemposCompletedat",
    NULL::character varying[] AS etiquetas;


--
-- Name: actividad id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad ALTER COLUMN id SET DEFAULT nextval('public.actividad_id_seq'::regclass);


--
-- Name: etiqueta id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etiqueta ALTER COLUMN id SET DEFAULT nextval('public.etiqueta_id_seq'::regclass);


--
-- Name: prioridad id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prioridad ALTER COLUMN id SET DEFAULT nextval('public.prioridad_id_seq'::regclass);


--
-- Name: proyecto id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto ALTER COLUMN id SET DEFAULT nextval('public.proyecto_id_seq'::regclass);


--
-- Name: actividad_etiquetas PK_00ffc4c36b8a43bbf21af669e94; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad_etiquetas
    ADD CONSTRAINT "PK_00ffc4c36b8a43bbf21af669e94" PRIMARY KEY ("actividadId", "etiquetaId");


--
-- Name: proyecto PK_589bf061fd654da7076e68e1699; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT "PK_589bf061fd654da7076e68e1699" PRIMARY KEY (id);


--
-- Name: etiqueta PK_621c4d2cb0f14181398ec5ddf6c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etiqueta
    ADD CONSTRAINT "PK_621c4d2cb0f14181398ec5ddf6c" PRIMARY KEY (id);


--
-- Name: actividad PK_ae34007f8c81abaf44d8992662d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT "PK_ae34007f8c81abaf44d8992662d" PRIMARY KEY (id);


--
-- Name: prioridad PK_d39830cb8adde4b9e24d498e893; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prioridad
    ADD CONSTRAINT "PK_d39830cb8adde4b9e24d498e893" PRIMARY KEY (id);


--
-- Name: prioridad UQ_3aecb1f9be4d25abddc413e07b5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prioridad
    ADD CONSTRAINT "UQ_3aecb1f9be4d25abddc413e07b5" UNIQUE (nivel);


--
-- Name: etiqueta UQ_c24e444690deb02aa6202719e56; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etiqueta
    ADD CONSTRAINT "UQ_c24e444690deb02aa6202719e56" UNIQUE (nombre);


--
-- Name: IDX_18d0492582ebea75ebd67950ae; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_18d0492582ebea75ebd67950ae" ON public.actividad_etiquetas USING btree ("etiquetaId");


--
-- Name: IDX_ed6a776b0bcc2f33af99f3fede; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_ed6a776b0bcc2f33af99f3fede" ON public.actividad_etiquetas USING btree ("actividadId");


--
-- Name: vw_actividades _RETURN; Type: RULE; Schema: public; Owner: -
--

CREATE OR REPLACE VIEW public.vw_actividades AS
 SELECT a.id,
    a.nombre AS nombre_actividad,
    a.estado,
    a.dificultad,
    p.nivel AS prioridad,
    pr.nombre AS proyecto,
    a.tiempos_createdat AS "tiemposCreatedat",
    a.tiempos_inprogressat AS "tiemposInprogressat",
    a.tiempos_completedat AS "tiemposCompletedat",
    COALESCE(array_agg(e.nombre ORDER BY e.nombre), (ARRAY[]::text[])::character varying[]) AS etiquetas
   FROM ((((public.actividad a
     LEFT JOIN public.prioridad p ON ((p.id = a."prioridadId")))
     LEFT JOIN public.proyecto pr ON ((pr.id = a."proyectoId")))
     LEFT JOIN public.actividad_etiquetas ae ON ((ae."actividadId" = a.id)))
     LEFT JOIN public.etiqueta e ON ((e.id = ae."etiquetaId")))
  GROUP BY a.id, p.nivel, pr.nombre;


--
-- Name: actividad_etiquetas FK_18d0492582ebea75ebd67950aea; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad_etiquetas
    ADD CONSTRAINT "FK_18d0492582ebea75ebd67950aea" FOREIGN KEY ("etiquetaId") REFERENCES public.etiqueta(id);


--
-- Name: actividad FK_18d58a7c86d9fb359650d9923a6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT "FK_18d58a7c86d9fb359650d9923a6" FOREIGN KEY ("proyectoId") REFERENCES public.proyecto(id);


--
-- Name: actividad FK_327a64ab365cc728c28adebfcce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT "FK_327a64ab365cc728c28adebfcce" FOREIGN KEY ("prioridadId") REFERENCES public.prioridad(id);


--
-- Name: actividad_etiquetas FK_ed6a776b0bcc2f33af99f3fede7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad_etiquetas
    ADD CONSTRAINT "FK_ed6a776b0bcc2f33af99f3fede7" FOREIGN KEY ("actividadId") REFERENCES public.actividad(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

