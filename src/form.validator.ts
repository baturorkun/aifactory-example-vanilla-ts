class FormValidator {
  validate(fields: FormFields): { errors: ValidationErrors } {
    const errors: ValidationErrors = {};
    
    if (!fields.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!fields.surname.trim()) {
      errors.surname = 'Surname is required';
    }
    
    return { errors };
  }
}