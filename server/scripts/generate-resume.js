const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const prisma = require('../lib/prisma');

async function generateResume() {
  try {
    console.log('Fetching data... (v2)');
    const [about, experiences, projects, skills, socials] = await Promise.all([
      prisma.about.findFirst(),
      prisma.experience.findMany({ orderBy: { id: 'desc' } }), // Newest first
      prisma.project.findMany({ include: { tags: true } }),
      prisma.skill.findMany(),
      prisma.social.findMany()
    ]);

    if (!about) {
      console.error('No About data found!');
      return;
    }

    const doc = new PDFDocument({ margin: 50 });
    const outputPath = path.join(__dirname, '../../public/resume.pdf');
    const writeStream = fs.createWriteStream(outputPath);

    doc.pipe(writeStream);

    // --- Header ---
    doc.fontSize(24).font('Helvetica-Bold').text(about.name, { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(about.title, { align: 'center' });
    
    doc.moveDown(0.5);
    const contactInfo = [
      about.email,
      about.location,
      socials.map(s => s.href).join(' | ')
    ].filter(Boolean).join(' • ');
    
    doc.fontSize(10).text(contactInfo, { align: 'center', color: 'grey' });
    doc.moveDown(1.5);

    // --- Summary ---
    if (about.subTitle) {
      doc.fontSize(14).font('Helvetica-Bold').fillColor('black').text('Professional Summary');
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').text(about.subTitle, { align: 'justify' });
      doc.moveDown(1.5);
    }

    // --- Skills ---
    if (skills.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('Skills');
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);
      
      const skillNames = skills.map(s => s.name).join(', ');
      doc.fontSize(10).font('Helvetica').text(skillNames);
      doc.moveDown(1.5);
    }

    // --- Experience ---
    if (experiences.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('Work Experience');
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      experiences.forEach(exp => {
        doc.fontSize(12).font('Helvetica-Bold').text(exp.title, { continued: true });
        doc.fontSize(10).font('Helvetica').text(`  |  ${exp.company || ''}`, { align: 'right' });
        
        doc.fontSize(10).font('Helvetica-Oblique').text(exp.date, { align: 'right' });
        
        if (exp.contents && exp.contents.length > 0) {
            doc.moveDown(0.3);
            exp.contents.forEach(point => {
                doc.fontSize(10).font('Helvetica').text(`• ${point}`, { indent: 10, align: 'justify' });
            });
        }
        doc.moveDown(1);
      });
      doc.moveDown(0.5);
    }

    // --- Projects ---
    if (projects.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('Projects');
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      projects.forEach(proj => {
        doc.fontSize(12).font('Helvetica-Bold').text(proj.title);
        if (proj.description) {
            doc.fontSize(10).font('Helvetica').text(proj.description, { align: 'justify' });
        }
        
        if (proj.tags && proj.tags.length > 0) {
            doc.fontSize(9).font('Helvetica-Oblique').fillColor('grey').text(`Tech: ${proj.tags.map(t => t.name).join(', ')}`);
            doc.fillColor('black');
        }
        doc.moveDown(0.8);
      });
    }

    doc.end();

    writeStream.on('finish', () => {
      console.log(`Resume generated successfully at ${outputPath}`);
    });

  } catch (error) {
    console.error('Error generating resume:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateResume();
