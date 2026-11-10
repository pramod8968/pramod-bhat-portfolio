import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { bootstrapApplication } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

interface SkillGroup {
  symbol: string;
  title: string;
  skills: string[];
}
interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: "./app.component.html",
})
export class App implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly activeSkill = signal("Spring Boot microservices");
  readonly skills = [
    "Spring Boot microservices",
    "Azure cloud architecture",
    "Angular experiences",
    "event-driven systems",
  ];
  private readonly skillTimer = window.setInterval(
    () =>
      this.activeSkill.update(
        (skill) =>
          this.skills[(this.skills.indexOf(skill) + 1) % this.skills.length],
      ),
    2800,
  );
  readonly metrics = [
    { value: "4+", label: "Years of experience" },
    { value: "450K+", label: "Messages cleared" },
    { value: "85%+", label: "Test coverage" },
    { value: "EDA", label: "Architecture mindset" },
  ];
  readonly skillGroups: SkillGroup[] = [
    {
      symbol: "\u2756",
      title: "Languages & web",
      skills: [
        "Java",
        "OOP",
        "SQL",
        "Python",
        "HTML5",
        "CSS3",
        "Angular",
        "TypeScript",
        "JavaScript",
      ],
    },
    {
      symbol: "\u2261",
      title: "Frameworks & tools",
      skills: [
        "Spring Boot",
        "Hibernate",
        "Spring Data JPA",
        "Spring Security",
        "JUnit",
        "Mockito",
        "Selenium",
        "Cucumber",
        "GitHub Copilot",
      ],
    },
    {
      symbol: "\u2601",
      title: "Cloud & DevOps",
      skills: [
        "Azure SQL",
        "Service Bus",
        "Functions",
        "APIM",
        "Pulsar",
        "Docker",
        "K8s",
        "Maven",
        "Git",
        "CI/CD",
      ],
    },
  ];
  readonly experiences: Experience[] = [
    {
      company: "Ness Digital Engineering",
      role: "Senior Engineer - Development (Previously Engineer - Development & Software Engineer - Trainee)",
      dates: "Feb 2023 — Present",
      location: "Bengaluru, India",
      bullets: [
        "Backend Architecture: Built scalable Spring Boot microservices and RESTful APIs integrated with event-driven messaging systems.",
        "Performance Tuning: Cleared a 450K+ Azure Service Bus message backlog by optimizing consumers with PEEK_LOCK.",
        "Query Optimization: Enhanced execution speeds and database health by optimizing complex JPA/Hibernate queries.",
        "Enterprise Security: Secured production API endpoints using Spring Security and Azure APIM OAuth 2.0 integration.",
        "AI Assisted Development: Leveraged GitHub Copilot for AI-assisted development, speeding up coding, debugging, and unit testing.",
        "Frontend Engineering: Maintained multiple Angular applications; built a Mat-Table workflow updating 1000+ failed locations.",
        "Production Support: Managed critical go-live cycles, high-priority defect resolution, and immediate bug hot-fixes.",
        "Code Governance: Addressed vulnerabilities flagged in SonarQube, CodeQL, and Veracode to sustain 85%+ test coverage.",
        "DevOps Automation: Built continuous delivery pipelines using Azure DevOps to ensure smooth multi-environment releases.",
        "Test Automation: Authored automated test scripts using Java, Cucumber, and Selenium to boost test coverage by 25%.",
      ],
    },
    {
      company: "Cloudwerx Solutions India",
      role: "Salesforce Developer - Trainee",
      dates: "Jul 2022 — Dec 2022",
      location: "Pune, India",
      bullets: [
        "Created 5+ Lightning Web Components and streamlined approval processes, reducing manual data entry time by 20%.",
        "Configured page layouts and record types, reducing data entry errors by 25% through custom validation rules.",
      ],
    },
  ];
  readonly awards = [
    {
      symbol: "\u2605",
      type: "Annual award \u00b7 2025 \u00b7 Ness Digital Engineering",
      title: "Customer Delight",
      description:
        "Recognized for exceptional delivery and consistently exceeding expectations.",
    },
    {
      symbol: "\u2606",
      type: "Quarterly award \u00b7 Ness Digital Engineering",
      title: "Extraordinary contribution",
      description:
        "Celebrated for delivering excellence and elevating the customer experience.",
    },
    {
      symbol: "\u25C8",
      type: "Spot award \u00b7 2\u00d7 \u00b7 Ness Digital Engineering",
      title: "Critical deliverables",
      description:
        "Received for special contributions in achieving high-priority project milestones.",
    },
  ];
  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    message: ["", [Validators.required, Validators.minLength(10)]],
    botcheck: [""],
  });

  submitContact(formDirective: any): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Capture form values and append your secure access key token
    const formData = new FormData();
    formData.append("access_key", "47331e2d-e111-47e2-8cdc-3091571ceaa7");
    formData.append("name", this.contactForm.controls.name.value);
    formData.append("email", this.contactForm.controls.email.value);
    formData.append("message", this.contactForm.controls.message.value);
    // Honeypot anti-spam defense field string
    formData.append("botcheck", this.contactForm.controls.botcheck.value || "");

    //TARGET CORRECTION: Posts data to the live submit API path wrapper
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.snackBar.open(
            "Thanks for reaching out. I’ll be in touch soon.",
            "Dismiss",
            {
              duration: 4500,
              panelClass: ["success-snackbar"],
              verticalPosition: "top",
              horizontalPosition: "center",
            },
          );
          // Reset layout states cleanly
          formDirective.resetForm();
          this.contactForm.reset();
        } else {
          this.snackBar.open(
            "Something went wrong. Please try again.",
            "Dismiss",
            {
              duration: 3000,
              verticalPosition: "top",
              horizontalPosition: "center",
            },
          );
        }
      })
      .catch(() => {
        this.snackBar.open("Network error. Please try again.", "Dismiss", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
      });
  }

  ngOnDestroy(): void {
    window.clearInterval(this.skillTimer);
  }
}

bootstrapApplication(App).catch((error: unknown) => console.error(error));
