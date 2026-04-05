# Laudo GMN Pro

Ferramenta de captação de dados do prospecto + diagnóstico de Google Meu Negócio para acelerar reuniões comerciais.

## Recursos

- **Ficha completa de captação** (origem do lead, decisor, canal ideal, orçamento, urgência e maturidade digital).
- **Checklist GMN estratégico** (9 pilares) com score ponderado.
- **Benchmark competitivo** com estimativa de gap de avaliações.
- **Fit comercial automático** para priorização de leads.
- **Lista de dados críticos faltantes** para qualificar melhor o prospect.
- **Roteiro de abordagem pronto** para WhatsApp/Direct/Ligação.
- **Plano de ação de 30 dias** + **rotina recorrente mensal**.
- **Exportação do laudo** em JSON, compartilhamento nativo e impressão em PDF.

## Android (PWA instalável)

A ferramenta foi preparada para smartphone Android com:

- `manifest.webmanifest` com ícones e modo `standalone`.
- `service-worker.js` para cache offline dos arquivos essenciais.
- botão **Instalar no Android** quando o navegador suportar `beforeinstallprompt`.

## Execução local

```bash
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

## Testes

```bash
node tests/logic.test.js
```
