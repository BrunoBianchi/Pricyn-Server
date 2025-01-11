"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crude_module_1 = __importDefault(require("./crude-module"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({
    username: 'no-reply@mail.pricyn.com',
    key: process.env.MAILGUN_API_KEY,
});
class EmailModule {
    async sendVerificationEmail(to, subject) {
        const user = await crude_module_1.default.findByEmail(to);
        const url = `https://api.pricyn.com/mail/verify-email?token=${user.verificationUid}`;
        // Caminhos dos arquivos
        const templatePath = path.join(__dirname, 'templates/email-template.html');
        const logoPath = path.join(__dirname, '../assets/P.svg');
        // Criar stream do logo
        const logoStream = fs.createReadStream(logoPath);
        // Ler e ajustar o template HTML
        let emailBody = fs.readFileSync(templatePath, 'utf8');
        emailBody = emailBody.replace('<img src="https://api.pricyn.com/P.svg"', '<img src="cid:P.svg"');
        emailBody = emailBody.replace(/\{\{url\}\}/g, url);
        try {
            const msg = await mg.messages.create('mail.pricyn.com', {
                from: "no-reply@mail.pricyn.com",
                to: [to],
                subject,
                html: emailBody,
                inline: [logoStream]
            });
            console.log('Email enviado:', msg);
        }
        catch (err) {
            console.error('Erro ao enviar email:', err);
            throw err;
        }
    }
    async sendWishlist(to, subject) {
        const templatePath = path.join(__dirname, 'templates/wishlist-template.html');
        const logoPath = path.join(__dirname, '../assets/P.svg');
        // Criar stream do logo
        const logoStream = fs.createReadStream(logoPath);
        // Ler e ajustar o template
        let emailBody = fs.readFileSync(templatePath, 'utf8');
        emailBody = emailBody.replace('<img src="https://api.pricyn.com/P.svg"', '<img src="cid:P.svg"');
        try {
            const msg = await mg.messages.create('mail.pricyn.com', {
                from: "no-reply@mail.pricyn.com",
                to: [to],
                subject,
                html: emailBody,
                inline: [logoStream]
            });
            console.log('Email enviado:', msg);
        }
        catch (err) {
            console.error('Erro ao enviar email:', err);
            throw err;
        }
    }
}
exports.default = new EmailModule();
//# sourceMappingURL=email-module.js.map