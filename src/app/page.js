"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

// O Leaflet precisa do objeto window, que só existe no navegador (visto em aulas anteriores)
const MapaVetorial = dynamic(() => import("../components/MapaVetorial"), {
    ssr: false,
    loading: () => <p className={styles.instrucaoVazio}>Carregando o mapa...</p>,
});

export default function Home() {
    const [municipio, setMunicipio] = useState(null);

    return (
        <main className={styles.container}>
            <header className={styles.cabecalho}>
                <h1>Mapas Vetoriais e Tabela de Atributos</h1>
                <p>Municípios de Santa Catarina (IBGE) em GeoJSON</p>
            </header>

            <section className={styles.mapaWrapper}>
                <MapaVetorial onSelecionarMunicipio={setMunicipio} />
            </section>

            <section className={styles.cardPainel}>
                <h2 className={styles.cardTitulo}>Tabela de Atributos</h2>

                {municipio ? (
                    <div className={styles.listaAtributos}>
                        <p className={styles.itemAtributo}>
                            <strong>Município:</strong> {municipio.NM_MUN}
                        </p>
                        <p className={styles.itemAtributo}>
                            <strong>Região imediata:</strong> {municipio.NM_RGI}
                        </p>
                        <p className={styles.itemAtributo}>
                            <strong>Região intermediária:</strong> {municipio.NM_RGINT}
                        </p>
                        <p className={styles.itemAtributo}>
                            <strong>Área:</strong> {municipio.AREA_KM2.toLocaleString("pt-BR")} km²
                        </p>
                        <p className={styles.itemAtributo}>
                            <strong>Código IBGE:</strong> {municipio.CD_MUN}
                        </p>
                    </div>
                ) : (
                    <p className={styles.instrucaoVazio}>
                        Toque ou clique em um município para consultar os atributos do GeoJSON.
                    </p>
                )}
            </section>

            <footer className={styles.rodape}>
               Janynne Palheta. Dados: IBGE, Malha Municipal 2025.
            </footer>
        </main>
    );
}