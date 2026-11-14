import fs from 'fs';

import path from 'path';

import  Handlebars from "handlebars";


export async function renderMailTemplate(templateName: string, data: Record<string, any>): Promise<string> {
  const templatePath = path.join(__dirname, `${templateName}.hbs`);
  try{

      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateContent);
      return template(data);
    }
    catch (error) {
        console.error(`Error rendering template ${templateName}:`, error);
        throw error;
        }
}
