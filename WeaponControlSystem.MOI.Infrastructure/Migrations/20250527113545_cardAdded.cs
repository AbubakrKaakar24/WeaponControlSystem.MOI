using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class cardAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeaponHandovers_Officers_OfficerBadgeNo",
                table: "WeaponHandovers");

            migrationBuilder.DropForeignKey(
                name: "FK_Weapons_Officers_OfficerBadgeNo",
                table: "Weapons");

            migrationBuilder.DropIndex(
                name: "IX_Weapons_OfficerBadgeNo",
                table: "Weapons");

            migrationBuilder.DropIndex(
                name: "IX_WeaponHandovers_OfficerBadgeNo",
                table: "WeaponHandovers");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Officers_BadgeNo",
                table: "Officers");

            migrationBuilder.DropColumn(
                name: "InDate",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "OfficerBadgeNo",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "OutDate",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "OfficerBadgeNo",
                table: "WeaponHandovers");

            migrationBuilder.RenameColumn(
                name: "CardNo",
                table: "Weapons",
                newName: "SerialNo");

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "Weapons",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OfficerID",
                table: "Weapons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "InBy",
                table: "WeaponHandovers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OfficerName",
                table: "WeaponHandovers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OutBy",
                table: "WeaponHandovers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNo",
                table: "Officers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IssueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Weapons_CardId",
                table: "Weapons",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CardNo",
                table: "Cards",
                column: "CardNo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Weapons_Cards_CardId",
                table: "Weapons",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weapons_Cards_CardId",
                table: "Weapons");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Weapons_CardId",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "OfficerID",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "InBy",
                table: "WeaponHandovers");

            migrationBuilder.DropColumn(
                name: "OfficerName",
                table: "WeaponHandovers");

            migrationBuilder.DropColumn(
                name: "OutBy",
                table: "WeaponHandovers");

            migrationBuilder.DropColumn(
                name: "PhoneNo",
                table: "Officers");

            migrationBuilder.RenameColumn(
                name: "SerialNo",
                table: "Weapons",
                newName: "CardNo");

            migrationBuilder.AddColumn<DateTime>(
                name: "InDate",
                table: "Weapons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "OfficerBadgeNo",
                table: "Weapons",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "OutDate",
                table: "Weapons",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OfficerBadgeNo",
                table: "WeaponHandovers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Officers_BadgeNo",
                table: "Officers",
                column: "BadgeNo");

            migrationBuilder.CreateIndex(
                name: "IX_Weapons_OfficerBadgeNo",
                table: "Weapons",
                column: "OfficerBadgeNo");

            migrationBuilder.CreateIndex(
                name: "IX_WeaponHandovers_OfficerBadgeNo",
                table: "WeaponHandovers",
                column: "OfficerBadgeNo");

            migrationBuilder.AddForeignKey(
                name: "FK_WeaponHandovers_Officers_OfficerBadgeNo",
                table: "WeaponHandovers",
                column: "OfficerBadgeNo",
                principalTable: "Officers",
                principalColumn: "BadgeNo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Weapons_Officers_OfficerBadgeNo",
                table: "Weapons",
                column: "OfficerBadgeNo",
                principalTable: "Officers",
                principalColumn: "BadgeNo",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
