"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const jwt_module_1 = __importDefault(require("./jwt-module"));
dotenv_1.default.config();
const mg = mailgun.client({
    username: 'no-reply@mail.pricyn.com',
    key: process.env.MAILGUN_API_KEY,
});
class EmailModule {
    async sendVerificationEmail(to, subject) {
        const hash = await jwt_module_1.default.signIn({ email: to });
        const url = `https://api.pricyn.com/mail/verify-email?token=${hash}`;
        // Carregar o template HTML
        const templatePath = './src/controller/templates/email-template.html';
        let emailBody = fs.readFileSync(templatePath, 'utf8');
        // Substituir o placeholder {{url}} pelo valor dinâmico
        emailBody = emailBody.replace('{{url}}', url);
        // Enviar o email usando o Mailgun
        mg.messages.create('mail.pricyn.com', {
            from: "no-reply@mail.pricyn.com",
            to: [to],
            subject,
            html: emailBody // Usa o HTML gerado com a substituição
        });
    }
}
exports.default = new EmailModule();
//# sourceMappingURL=email-module.js.map