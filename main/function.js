const { createApp } = Vue;

createApp({
    data() {
        return {
            mesAtual: 10,
            anoAtual: 2026,

            diaSelecionado: null,
            diaExpandido: false,

            compromissos: [],
            novoHorario: '',
            novaDescricao: '',
            previsaoClima: []
        };
    },
    computed: {
        nomeMes() {
            const data = new Date(
                this.anoAtual,
                this.mesAtual
            );
            return data.toLocaleDateString('pt-BR', { month: 'long' });
        },
        diasDoMes() {
            const quantidade = new Date(
                this.anoAtual,
                this.mesAtual + 1,
                0
            ).getDate();

            return Array.from(
                { length: quantidade },
                (_, index) => index + 1
            );
        },
        diasVazios() {
            const primeiroDia = new Date(
                this.anoAtual,
                this.mesAtual,
                1
            ).getDay();

            return Array.from(
                { length: primeiroDia },
                (_, index) => index
            );
        },
        compromissosDoDia() {
            return this.compromissos
                .filter(compromisso =>
                    compromisso.dia === this.diaSelecionado &&
                    compromisso.mes === this.mesAtual &&
                    compromisso.ano === this.anoAtual
                )
                .sort((a, b) =>
                    a.horario.localeCompare(b.horario)
                );
        },
        compromissosPorDia() {
            const agrupados = {};

            this.compromissos
                .filter(c => c.mes === this.mesAtual && c.ano === this.anoAtual)
                .forEach(c => {
                    if (!agrupados[c.dia]) {
                        agrupados[c.dia] = [];
                    }

                    agrupados[c.dia].push(c);
                });

            Object.values(agrupados).forEach(lista => {
                lista.sort((a, b) => a.horario.localeCompare(b.horario));
            });

            return agrupados;
        },
        previsaoSemana() {
            const hoje = new Date().toLocaleDateString('en-CA', {
                timeZone: 'America/Sao_Paulo'
            });

            return this.previsaoClima
                .filter(previsao => previsao.data >= hoje)
                .slice(0, 7);
        },
        todosCompromissosDoMes() {
            return this.compromissos
                .filter(compromisso =>
                    compromisso.mes === this.mesAtual &&
                    compromisso.ano === this.anoAtual
                )
                .sort((a, b) => {
                    if (a.dia !== b.dia) {
                        return a.dia - b.dia;
                    }

                    return a.horario.localeCompare(b.horario);
                });
        },
    },
    methods: {
        proximoMes() {
            if (this.mesAtual === 11) {
                this.mesAtual = 0;
                this.anoAtual++;
            } else {
                this.mesAtual++;
            }
        },
        mesAnterior() {
            if (this.mesAtual === 0) {
                this.mesAtual = 11;
                this.anoAtual--;
            } else {
                this.mesAtual--;
            }

        },
        selecionarDia(dia) {
            this.diaSelecionado = dia;
            this.diaExpandido = true;

            console.log("Previsão do dia:", this.previsaoDoDia(dia));
        },

        fecharDia() {
            this.diaExpandido = false;
            this.diaSelecionado = null;
        },
        adicionarCompromisso() {

            if (!this.novoHorario || !this.novaDescricao.trim()) {
                alert('Preencha o horário e a descrição!');
                return;
            }

            this.compromissos.push({
                dia: this.diaSelecionado,
                mes: this.mesAtual,
                ano: this.anoAtual,
                horario: this.novoHorario,
                descricao: this.novaDescricao
            });

            this.novoHorario = '';
            this.novaDescricao = '';

        },
        async buscarClima() {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=16";

            try {
                const resposta = await fetch(url);

                if (!resposta.ok) {
                    throw new Error("Não foi possível consultar a previsão.");
                }

                const dados = await resposta.json();

                this.previsaoClima = dados.daily.time.map((data, indice) => {
                    return {
                        data: data,
                        temperaturaMaxima: dados.daily.temperature_2m_max[indice],
                        temperaturaMinima: dados.daily.temperature_2m_min[indice],
                        codigoClima: dados.daily.weather_code[indice],
                        probabilidadeChuva: dados.daily.precipitation_probability_max[indice]
                    };
                });

                console.log("Previsões organizadas:", this.previsaoClima);

            } catch (erro) {
                console.error("Erro ao buscar previsão:", erro);
            }
        },
        previsaoDoDia(dia) {
            const dataProcurada = `${this.anoAtual}-${String(this.mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

            return this.previsaoClima.find(previsao => {
                return previsao.data === dataProcurada;
            });
        },
        nomeDiaSemana(data) {
            const dataFormatada = new Date(data + 'T12:00:00');

            return dataFormatada.toLocaleDateString('pt-BR', {
                weekday: 'short'
            });
        },
        removerCompromisso(compromisso) {
            const confirmar = confirm('Deseja realmente excluir este compromisso?');

            if (!confirmar) {
                return;
            }

            const indice = this.compromissos.indexOf(compromisso);

            if (indice !== -1) {
                this.compromissos.splice(indice, 1);
            }
        },
    },
    mounted() {
        this.buscarClima();

    }
}).mount('#app');