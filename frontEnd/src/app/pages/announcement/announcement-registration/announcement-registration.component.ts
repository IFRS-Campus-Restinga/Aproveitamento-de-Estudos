import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementStepComponent } from 'src/app/components/announcement-step/announcement-step.component';
import { Etapa } from 'src/app/model/Etapa';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent implements OnInit{

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute){

  }
  ngOnInit(): void {
    const edital: any = this.route.snapshot.data['edital'];

    this.form = this.formBuilder.group({
        numero: [''],
        dataInicio: [''],
        dataFim:  [''],
        steps: this.formBuilder.array(this.retriveSteps(edital))
      }
    );
  }

  addStep() {
    const steps = this.form.get('steps') as UntypedFormArray;
    steps.push(this.createSteps());
  }

  submitForm() {
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor ou exibi-los no console.
    console.log(this.form.value);
    //console.log(this.steps[0].formData);
  }

  private createSteps(steps : Etapa = {id: '', descricao: '', ator: '', dataInicio: '', dataFim: ''}){
    return this.formBuilder.group({
      id: [steps.id],
      descricao: [steps.descricao],
      ator: [steps.ator],
      dataInicio: [steps.dataInicio],
      dataFim: [steps.dataFim]
    });
  }

  getStepsFormArray(){
    return (<UntypedFormArray>this.form.get('steps')).controls;
  }

  private retriveSteps(edital: any){
    const steps = [];
    if(edital?.etapas){
      edital.etapas.forEach((etapa: any) => steps.push(this.createSteps(etapa)))
    }else{
      steps.push(this.createSteps());
    }
    return steps;
  }

  removeSteps(i: number) {
    const steps = this.form.get('steps') as UntypedFormArray;
    steps.removeAt(i);
  }
}
