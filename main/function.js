const { createApp } = Vue;

createApp({
    data() {
        return {
            mesAtual: 10,
            anoAtual: 2026
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
        }
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

        }
    }
}).mount('#app');