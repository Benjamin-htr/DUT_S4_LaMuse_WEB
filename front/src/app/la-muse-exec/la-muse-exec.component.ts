import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LaMuseCallService } from '../services/la-muse-call.service';

@Component({
  selector: 'app-la-muse-exec',
  templateUrl: './la-muse-exec.component.html',
  styleUrls: ['./la-muse-exec.component.css']
})
export class LaMuseExecComponent implements OnInit {
  title : string = 'Generate Images';
  fileUploadService : any ;


  constructor(private rs : LaMuseCallService){}

  

  ngOnInit(): void {
    /* this.rs.executeLaMuse()
      .subscribe
        (
          (response) => 
          {
            console.log(response);
            
          },
          (error) =>
          {
            console.log("No Data Found" + error);
          }

        ) */
  }

  onFolderSelected(event){
    if (event.target.files.length > 0){
        let files = event.target.files;
    }     
}

fileToUpload: File = null;
handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}

/*fichierAEnvoyer: File = null;

//Fonction qui récupère le fichier pour l'ajouter à la variable
//Elle est appelée lors d'un changement sur l'input du fichier
//S'il y a plusieurs fichiers, il faudra adapter le code avec une variable de type "FileList" et parcourir la liste de fichiers avec une boucle.
envoiFichier (fichiers: FileList) {
    this.fichierAEnvoyer = fichiers.item(0);
    console.log(fichiers.item(0));
}
*/
//Fonction qui va lier l'attribut au service qui envoie le fichier au site ou à l'API. On utilise pour cela le système de souscription issue de la programmation réactive
/*envoiFichierParLeService() {
    this.envoiFichierService.postFile(this.fichierAEnvoyer).subscribe(resultat => {
      // Code à développer ici en cas de succès de l'envoi du fichier
      }, erreur => {
        console.log("Erreur lors de l'envoi du fichier : ", erreur);
      });*/
}


